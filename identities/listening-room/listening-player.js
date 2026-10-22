/* listening-player.js - the listening-room identity's sanctioned player
   module. Progressive enhancement over the native <audio controls> fallback:
   the page renders completely without it; with it, the player becomes the
   waveform scrubber and every part of the page can drive playback.

   Contract (see prompt-pack.md):
   - One root per player: [data-lr-player] with data-audio, data-title,
     data-show, and optionally data-duration (server-rendered seconds).
   - Waveform peaks: <script type="application/json" data-lr-peaks> inside
     the root ({ duration, data: [amplitude...] }) or a data-peaks-src URL.
     Without peaks the wavebox degrades to a plain scrubber track.
   - One audio graph per page: the module ADOPTS the first player's native
     <audio> element (the no-JS fallback control) as the shared media
     element; other players' native elements are stripped of src so extra
     players (index cards) never prefetch. A page may carry several
     players; the first root owns the transcript and the mini-player.
   - Transcript: .lr-transcript containing .lr-tp[data-start][data-role]
     paragraphs; the module stamps .is-past/.is-now and drives the
     .lr-follow resume chip when the reader scrolls away.
   - Chapters: .lr-chbtn[data-start] buttons anywhere on the page, plus the
     .lr-chlabel line under the transport.
   - Seeks never rely on bare currentTime assignment before the media is
     seekable: they wait for a real seekable range and never restart an
     in-flight download (a pattern proven on a production audio page).
   - Keyboard: space/K play-pause, J/L back/forward 10s (global; skipped
     while typing). The waveform is role=slider: arrows +/-5s, Home/End.
   - Media Session: metadata plus play/pause/seek/seekto handlers.
   - No dependencies, no build step. */
(function () {
  'use strict';

  var SPEEDS = [1, 1.25, 1.5, 1.75, 2];
  var SAVE_STEP = 5;
  var STORE_KEY = 'lr-listen:';
  var doc = document;
  var html = doc.documentElement;
  var audio = null; // the page's one media graph: the first player's native element
  var loadedUrl = '';
  var players = [];
  var current = null;
  var rate = 1;
  var pendingSeek = null; // null = none; a number, including 0, is a live seek
  var seekTimer = 0;
  var docWired = false;
  var resumeAt = 0;
  var lastSaved = 0;
  var raf = 0;
  var ghostX = -1;
  var miniDismissed = false;

  html.classList.add('lr-js');

  /* ---------- helpers ---------- */

  function clock(s) {
    if (!isFinite(s) || s <= 0) return '';
    s = Math.floor(s);
    var h = Math.floor(s / 3600);
    var m = Math.floor((s % 3600) / 60);
    var r = s % 60;
    var pad = function (n) { return String(n).padStart(2, '0'); };
    return h > 0 ? h + ':' + pad(m) + ':' + pad(r) : m + ':' + pad(r);
  }

  function savedTime(url) {
    try { var v = parseFloat(localStorage.getItem(STORE_KEY + url)); return isFinite(v) && v > 0 ? v : 0; }
    catch (e) { return 0; }
  }

  function saveTime(url, t) {
    try { localStorage.setItem(STORE_KEY + url, String(t)); } catch (e) {}
  }

  /* ---------- seek that cannot be dropped ----------
     A bare currentTime assignment before a real seekable range exists is
     silently lost and playback restarts from 0. Wait for the range; never
     reload an in-flight download more than once per pending seek. */
  function safeSeek(t) {
    if (!isFinite(t) || t < 0) return;
    if (seekTimer) { clearInterval(seekTimer); seekTimer = 0; }
    var end = 0;
    try { end = audio.seekable.length && audio.seekable.end(audio.seekable.length - 1); } catch (e) {}
    if (end > Math.max(t, 1)) {
      audio.currentTime = Math.min(t, Math.max(0, (audio.duration || t) - 0.2));
      pendingSeek = null;
      return;
    }
    pendingSeek = t;
    var tries = 0;
    var reloaded = false;
    seekTimer = setInterval(function () {
      end = 0;
      try { end = audio.seekable.length && audio.seekable.end(audio.seekable.length - 1); } catch (e) {}
      if (pendingSeek != null && end > Math.max(pendingSeek, 1)) {
        audio.currentTime = Math.min(pendingSeek, Math.max(0, (audio.duration || pendingSeek) - 0.2));
        pendingSeek = null;
        clearInterval(seekTimer);
        seekTimer = 0;
      } else if (audio.error || ++tries > 240) {
        clearInterval(seekTimer);
        seekTimer = 0;
      } else if (end === 0 && audio.readyState >= 1 && !audio.error && !reloaded) {
        // metadata present but the range is stale: one re-select, capped
        reloaded = true;
        try { audio.load(); } catch (e) {}
      }
    }, 250);
  }

  function seekBy(sec) {
    if (!current) return;
    var t = Math.min(Math.max(0, audio.currentTime + sec), audio.duration || sec);
    safeSeek(t);
    paint();
  }

  /* ---------- waveform ---------- */

  function drawWave(p) {
    var ui = p._ui;
    var c = ui.canvas, ctx = ui.ctx;
    var dpr = window.devicePixelRatio || 1;
    var w = c.clientWidth, h = c.clientHeight;
    if (!w || !h) return;
    if (c.width !== w * dpr || c.height !== h * dpr) {
      c.width = w * dpr; c.height = h * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    var dur = p._duration || (ui.peaks && ui.peaks.duration) || 0;
    var frac = dur && p === current ? Math.min(1, audio.currentTime / dur) : 0;
    var mid = h / 2;

    if (!ui.peaks || !ui.peaks.data || !ui.peaks.data.length) {
      // no peaks: degrade to a visible plain scrubber track
      ctx.fillStyle = p._colors ? p._colors.idle : '#666';
      ctx.fillRect(0, mid - 1, w, 2);
      ctx.fillStyle = p._colors ? p._colors.played : '#999';
      ctx.fillRect(0, mid - 1, w * frac, 2);
    } else {
      var barW = 3, gap = 1;
      var count = Math.floor(w / (barW + gap));

      var x, i, amp, bh;
      for (i = 0; i < count; i++) {
        x = i * (barW + gap);
        amp = ui.peaks.data[Math.floor(i * ui.peaks.data.length / count)] || 0;
        bh = Math.max(2, amp * (h - 8));
        ctx.fillStyle = (i / count) < frac ? p._colors.played : p._colors.idle;
        ctx.fillRect(x, mid - bh / 2, barW, bh);
      }

      // chapter boundaries: full-height hairlines over the waveform
      if (dur && p._chapters && p._chapters.length) {
        ctx.fillStyle = p._colors.tick;
        p._chapters.forEach(function (ch) {
          if (ch.start > 0) ctx.fillRect(Math.round(ch.start / dur * w), 2, 1, h - 4);
        });
      }

      // hover ghost
      if (ghostX >= 0) {
        ctx.fillStyle = p._colors.ghost;
        ctx.fillRect(ghostX, 0, 1, h);
      }

      // playhead
      if (dur && frac > 0) {
        ctx.fillStyle = p._colors.played;
        ctx.fillRect(Math.round(frac * w), 0, 2, h);
      }
    }

    // slider semantics
    ui.wave.setAttribute('aria-valuemin', '0');
    ui.wave.setAttribute('aria-valuemax', Math.round(dur));
    ui.wave.setAttribute('aria-valuenow', Math.round(dur * frac));
    ui.wave.setAttribute('aria-valuetext', clock(dur * frac) + ' of ' + clock(dur));
  }

  /* Colors: canvas cannot take light-dark() token streams (invalid
     fillStyle), so resolve each custom property through a real property
     on a probe node. Re-resolved on every theme flip. */
  function resolveColors(p) {
    var probe = p._probe;
    var get = function (name) {
      probe.style.color = 'var(' + name + ')';
      return getComputedStyle(probe).color;
    };
    p._colors = {
      idle: get('--lr-wave-idle'),
      played: get('--lr-wave-played'),
      tick: get('--line'),
      ghost: get('--faint'),
    };
  }

  function paint() {
    if (raf) return;
    raf = requestAnimationFrame(function () {
      raf = 0;
      players.forEach(function (p) {
        var isCur = p === current;
        var t = isCur && isFinite(audio.currentTime) ? audio.currentTime : 0;
        p._ui.elapsed.textContent = clock(t) || '0:00';
        drawWave(p);
      });
      if (current) paintMini();
    });
  }

  /* ---------- chapters + transcript ---------- */

  function chapterIndex(p, t) {
    var idx = -1;
    (p._chapters || []).forEach(function (ch, i) { if (t >= ch.start) idx = i; });
    return idx;
  }

  function paintChapters(p, t) {
    var idx = chapterIndex(p, t);
    p._chbtns.forEach(function (b, i) { b.classList.toggle('is-now', i === idx); });
    if (p._ui.chlabel) {
      var ch = p._chapters && p._chapters[idx];
      p._ui.chlabel.innerHTML = '';
      if (ch) {
        var b = doc.createElement('b');
        b.textContent = 'Chapter ' + (idx + 1) + ' of ' + p._chapters.length;
        p._ui.chlabel.appendChild(b);
        p._ui.chlabel.appendChild(doc.createTextNode(' - ' + ch.title));
      }
    }
  }

  function paintTranscript(p, t) {
    if (!p._tps || !p._tps.length) return;
    var idx = -1;
    for (var i = 0; i < p._tps.length; i++) {
      if (t >= parseFloat(p._tps[i].dataset.start)) idx = i;
    }
    p._tps.forEach(function (tp, i) {
      tp.classList.toggle('is-now', i === idx);
      tp.classList.toggle('is-past', idx >= 0 && i < idx);
    });
    if (idx >= 0 && p._followChip && p._followOn) {
      var tp = p._tps[idx];
      if (!p._followChip.classList.contains('is-on')) {
        var r = tp.getBoundingClientRect();
        if (r.top < 0 || r.bottom > window.innerHeight) {
          tp.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
      }
    }
  }

  /* ---------- mini-player ---------- */

  function paintMini() {
    if (!current) return;
    var m = current._mini;
    if (!m) return;
    // persists while paused so the reader can resume from where they are;
    // only Close (dismiss) or ending the episode retires it
    var started = !audio.paused || audio.currentTime > 0;
    var show = started && !audio.ended && !miniDismissed && current._outOfView;
    m.root.classList.toggle('is-active', show);
    doc.body.classList.toggle('has-lrmini', show);
    if (show) {
      m.btn.textContent = audio.paused ? 'Play' : 'Pause';
      m.title.textContent = current._root.dataset.title || '';
      m.fill.style.width = current._duration
        ? Math.min(100, (audio.currentTime / current._duration) * 100) + '%' : '0%';
    }
  }

  /* ---------- playback ---------- */

  function load(p) {
    if (current === p) return;
    if (current) { setBtn(current, false); }
    current = p;
    miniDismissed = false;
    var url = p._root.dataset.audio;
    if (loadedUrl !== url) {
      loadedUrl = url;
      resumeAt = savedTime(url);
      if (seekTimer) { clearInterval(seekTimer); seekTimer = 0; }
      pendingSeek = null;
      audio.src = url;
    } else {
      resumeAt = 0;
    }
    audio.playbackRate = rate;
    setMediaSession(p);
    if (p._mini) p._mini.title.textContent = p._root.dataset.title || '';
  }

  function setBtn(p, playing) {
    p._ui.play.textContent = playing ? 'Pause' : 'Play';
    p._ui.play.classList.toggle('is-playing', playing);
  }

  function play(p) {
    load(p);
    audio.playbackRate = rate;
    audio.play().then(function () {
      if (current !== p) return;
      setBtn(p, true);
      paint();
      paintMini();
    }).catch(function () {
      if (current !== p) return;
      setBtn(p, false);
    });
  }

  function pause() {
    audio.pause();
    if (current) {
      setBtn(current, false);
      saveTime(current._root.dataset.audio, audio.currentTime);
    }
    paintMini();
  }

  function toggle(p) {
    if (p === current && !audio.paused) { pause(); return; }
    play(p);
  }

  function setMediaSession(p) {
    if (!('mediaSession' in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: p._root.dataset.title || '',
      artist: p._root.dataset.show || '',
    });
    navigator.mediaSession.setActionHandler('play', function () { play(current); });
    navigator.mediaSession.setActionHandler('pause', pause);
    navigator.mediaSession.setActionHandler('seekbackward', function () { seekBy(-15); });
    navigator.mediaSession.setActionHandler('seekforward', function () { seekBy(30); });
    try {
      navigator.mediaSession.setActionHandler('seekto', function (d) {
        if (d.seekTime != null) safeSeek(d.seekTime);
      });
    } catch (e) {}
  }

  function setPositionState() {
    if (!('mediaSession' in navigator) || !isFinite(audio.duration)) return;
    try {
      navigator.mediaSession.setPositionState({
        duration: audio.duration,
        playbackRate: audio.playbackRate,
        position: audio.currentTime,
      });
    } catch (e) {}
  }

  /* ---------- page-scoped wiring (first player owns it) ----------
     Chapter buttons, the transcript, and the mini-player are bound to
     the page exactly once; handlers route through the owning player. */
  function wirePageScope(p) {
    var root = p._root;

    // chapters: page-level buttons drive the owning player
    Array.prototype.slice.call(doc.querySelectorAll('.lr-chbtn[data-start]')).forEach(function (b) {
      var start = parseFloat(b.dataset.start);
      if (!isFinite(start)) return;
      p._chapters.push({ title: b.dataset.title || b.textContent.trim(), start: start });
      p._chbtns.push(b);
      b.addEventListener('click', function () {
        play(p);
        safeSeek(start);
        window.scrollTo({ top: root.getBoundingClientRect().top + window.scrollY - 24, behavior: 'smooth' });
      });
    });

    // transcript: the chip sits INSIDE .lr-transcript (sticky)
    var tr = doc.querySelector('.lr-transcript');
    if (tr) {
      p._tps = Array.prototype.slice.call(tr.querySelectorAll('.lr-tp[data-start]'));
      p._followChip = doc.querySelector('.lr-follow');
      p._followOn = true;
      p._tps.forEach(function (tp) {
        tp.addEventListener('click', function (e) {
          if (e.target.closest('.lr-tstamp')) { p._followOn = true; updateChip(p); }
          play(p);
          safeSeek(parseFloat(tp.dataset.start));
        });
      });
      // reading away pauses follow; the chip offers it back
      tr.addEventListener('wheel', function () { holdFollow(p); }, { passive: true });
      tr.addEventListener('touchmove', function () { holdFollow(p); }, { passive: true });
      if (p._followChip) {
        p._followChip.addEventListener('click', function () {
          p._followOn = true; updateChip(p);
          var now = tr.querySelector('.lr-tp.is-now');
          var idx = p._tps.indexOf(now);
          if (idx >= 0) p._tps[idx].scrollIntoView({ block: 'center', behavior: 'smooth' });
        });
      }
    }

    // mini-player
    var miniRoot = doc.querySelector('.lr-mini');
    if (miniRoot) {
      p._mini = {
        root: miniRoot,
        btn: miniRoot.querySelector('.lr-mini-btn'),
        title: miniRoot.querySelector('.lr-mini-title'),
        track: miniRoot.querySelector('.lr-mini-track'),
        fill: miniRoot.querySelector('.lr-mini-fill'),
        close: miniRoot.querySelector('.lr-mini-close'),
      };
      p._mini.btn.addEventListener('click', function () {
        if (!current) return;
        audio.paused ? play(current) : pause();
      });
      p._mini.track.addEventListener('click', function (e) {
        if (!current || !isFinite(audio.duration)) return;
        var r = p._mini.track.getBoundingClientRect();
        safeSeek((e.clientX - r.left) / r.width * audio.duration);
      });
      p._mini.close.addEventListener('click', function () {
        miniDismissed = true;
        p._mini.root.classList.remove('is-active');
        doc.body.classList.remove('has-lrmini');
      });
    }
  }

  /* ---------- per-player setup ---------- */

  function setup(p) {
    var root = p._root;
    p._ui = {
      play: root.querySelector('.lr-tbtn--play'),
      back: root.querySelector('.lr-tbtn--back'),
      fwd: root.querySelector('.lr-tbtn--fwd'),
      speed: root.querySelector('.lr-speed'),
      elapsed: root.querySelector('.lr-elapsed'),
      total: root.querySelector('.lr-total'),
      wavebox: root.querySelector('.lr-wavebox'),
      wave: root.querySelector('.lr-wave'),
      tip: root.querySelector('.lr-wave-tip'),
      chlabel: root.querySelector('.lr-chlabel'),
    };
    p._canvas = root.querySelector('.lr-wave');
    if (p._canvas) {
      p._ctx = p._canvas.getContext('2d');
      p._ui.canvas = p._canvas;
      p._ui.ctx = p._ctx;
      p._probe = doc.createElement('span');
      p._probe.style.display = 'none';
      root.appendChild(p._probe);
      resolveColors(p);
    }

    // peaks: inline JSON block first, then data-peaks-src
    var peakSrc = root.querySelector('script[type="application/json"][data-lr-peaks]');
    if (peakSrc) {
      try { p._ui.peaks = JSON.parse(peakSrc.textContent); } catch (e) {}
    } else if (root.dataset.peaksSrc) {
      fetch(root.dataset.peaksSrc).then(function (r) { return r.ok ? r.json() : null; })
        .then(function (j) { if (j && j.data) { p._ui.peaks = j; paint(); } })
        .catch(function () {});
    }

    // chapters, transcript, and mini-player are page-scoped and owned by
    // the first player (the pack's ownership contract): wire them once.
    p._chapters = [];
    p._chbtns = [];
    p._tps = null;
    if (p === players[0] && !docWired) {
      docWired = true;
      wirePageScope(p);
    }

    // every player observes its own root for mini-player visibility
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        p._outOfView = !entries[0].isIntersecting;
        if (current) paintMini();
      }, { threshold: 0.4 }).observe(root);
    }

    /* transport */
    if (p._ui.play) p._ui.play.addEventListener('click', function () { toggle(p); });
    if (p._ui.back) p._ui.back.addEventListener('click', function () { seekBy(-15); });
    if (p._ui.fwd) p._ui.fwd.addEventListener('click', function () { seekBy(30); });
    if (p._ui.speed) p._ui.speed.addEventListener('click', function () {
      rate = SPEEDS[(SPEEDS.indexOf(rate) + 1) % SPEEDS.length];
      audio.playbackRate = rate;
      players.forEach(function (q) { if (q._ui.speed) q._ui.speed.textContent = rate + 'x'; });
    });

    /* waveform scrubbing: down seeks, drag scrubs, hover previews */
    if (p._ui.wavebox && p._canvas) {
      var box = p._ui.wavebox;
      var fracAt = function (e) {
        var r = p._canvas.getBoundingClientRect();
        return Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      };
      p._canvas.setAttribute('tabindex', '0');
      p._canvas.setAttribute('role', 'slider');
      p._canvas.setAttribute('aria-label', 'Seek within episode');
      box.addEventListener('pointerdown', function (e) {
        if (!p._duration) { play(p); return; }
        box.setPointerCapture(e.pointerId);
        p._dragging = true;
        play(p);
        safeSeek(fracAt(e) * p._duration);
      });
      box.addEventListener('pointermove', function (e) {
        var frac = fracAt(e);
        var r = p._canvas.getBoundingClientRect();
        ghostX = frac * r.width;
        if (p._dragging && p._duration) safeSeek(frac * p._duration);
        if (p._ui.tip && p._duration) {
          p._ui.tip.classList.add('on');
          p._ui.tip.style.left = ghostX + 'px';
          p._ui.tip.textContent = clock(frac * p._duration);
        }
        if (p === current) drawWave(p);
      });
      box.addEventListener('pointerleave', function () {
        ghostX = -1;
        if (p._ui.tip) p._ui.tip.classList.remove('on');
        if (p === current) drawWave(p);
      });
      box.addEventListener('pointerup', function () { p._dragging = false; });
      box.addEventListener('pointercancel', function () { p._dragging = false; });
      p._canvas.addEventListener('lostpointercapture', function () { p._dragging = false; });
      p._canvas.addEventListener('keydown', function (e) {
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        if (!p._duration) return;
        var step = { ArrowLeft: -5, ArrowRight: 5 }[e.key];
        if (step) { e.preventDefault(); play(p); seekBy(step); }
        else if (e.key === 'Home') { e.preventDefault(); play(p); safeSeek(0); }
        else if (e.key === 'End') { e.preventDefault(); play(p); safeSeek(p._duration - 1); }
      });
      if ('ResizeObserver' in window) {
        new ResizeObserver(function () { drawWave(p); }).observe(p._canvas);
      }
    }

    /* duration: server value if present, else metadata */
    if (root.dataset.duration) setTotal(p, parseFloat(root.dataset.duration));

    /* theme flips re-resolve every token: recolor + repaint */
    window.addEventListener('lr:theme', function () {
      if (p._canvas) resolveColors(p);
      paint();
    });
  }

  function setTotal(p, seconds) {
    if (!isFinite(seconds) || seconds <= 0) return;
    p._duration = seconds;
    if (p._ui.total) {
      p._ui.total.textContent = clock(seconds);
      p._ui.total.style.display = '';
    }
    paint();
  }

  function holdFollow(p) {
    if (!p._followOn) return;
    p._followOn = false;
    updateChip(p);
  }

  function updateChip(p) {
    if (p._followChip) p._followChip.classList.toggle('is-on', !p._followOn);
  }

  /* ---------- global wiring ---------- */

  Array.prototype.slice.call(doc.querySelectorAll('[data-lr-player]')).forEach(function (root) {
    var p = { _root: root, _outOfView: false };
    players.push(p);
  });
  if (!players.length) return;

  // Adopt the first player's native audio element as the page's shared
  // media graph; strip the others so extra players (index cards) never
  // prefetch. No native element -> fall back to a detached one.
  audio = players[0]._root.querySelector('.lr-native') || new Audio();
  players.slice(1).forEach(function (p) {
    var el = p._root.querySelector('.lr-native');
    if (el && el !== audio) { el.removeAttribute('src'); el.load(); }
  });

  players.forEach(setup);

  audio.addEventListener('loadedmetadata', function () {
    if (!current) return;
    if (!current._root.dataset.duration) setTotal(current, audio.duration);
    if (pendingSeek != null) { safeSeek(pendingSeek); }
    else if (resumeAt > 0 && resumeAt < audio.duration - 1) { safeSeek(resumeAt); }
    resumeAt = 0;
  });
  audio.addEventListener('play', function () { if (current) { setBtn(current, true); paintMini(); } });
  audio.addEventListener('pause', function () { if (current) { setBtn(current, false); paintMini(); } });
  audio.addEventListener('ended', function () {
    if (!current) return;
    setBtn(current, false);
    saveTime(current._root.dataset.audio, 0);
    paintMini();
  });
  audio.addEventListener('timeupdate', function () {
    if (!current) return;
    var t = audio.currentTime;
    if (t < lastSaved || t - lastSaved >= SAVE_STEP) {
      lastSaved = t;
      saveTime(current._root.dataset.audio, t);
      setPositionState();
    }
    paintChapters(current, t);
    paintTranscript(current, t);
    paint();
  });

  /* global keys: space/K toggle, J/L +-10s; skipped while typing */
  doc.addEventListener('keydown', function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    var el = e.target;
    if (el.closest && el.closest('input, textarea, select, [contenteditable]')) return;
    if (e.key === ' ' || e.key === 'k' || e.key === 'K') {
      e.preventDefault();
      toggle(players[0]);
    } else if (e.key === 'j' || e.key === 'J') {
      e.preventDefault();
      seekBy(-10);
    } else if (e.key === 'l' || e.key === 'L') {
      e.preventDefault();
      seekBy(10);
    }
  });

  paint();
})();
