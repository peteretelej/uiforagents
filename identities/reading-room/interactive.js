/* reading-room interactive addendum - state wiring for Soma pages.
   Pairs with interactive.css. Self-boots on DOMContentLoaded: the soma stub
   is injected at serve time near the end of body (or right after <body> on
   newer builds), so no synchronous check in page scripts can see it.
   Expects these hooks in the page (all optional, probed at boot):
     #rro-banner        read-only notice, unhidden when editing is unavailable
     #rro-save          save-status text node
     #rro-progress strong  "N of M done" line; items = .rro-item[data-id]
     #rro-bar-fill      progress fill span
     [data-rro-count]   per-phase chips, attr value = id prefix (e.g. "a")
     .rro-item[data-id] with input.rro-box + input.rro-note
     [data-rro-fact]    key-fact inputs, attr value = doc.facts key
     #rro-log-text / #rro-log-add / #rro-log-list  dated notes log
     #rro-attach        soma.attachments.mount target
   State doc shape: { checks: {id: {d, n}}, facts: {key: value}, log: [{t, x}] }.
*/
(function () {
  "use strict";

  function boot() {
    var soma = (typeof window.soma === "object" && window.soma) || null;
    var canEdit = !!(soma && soma.role === "editor");
    var doc = { checks: {}, facts: {}, log: [] };
    var touched = { checks: {}, facts: {}, log: [] };
    var lastPutJson = null;
    var timer = null;

    function all(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }
    function now() { return new Date().toISOString(); }
    function setSave(text) {
      var el = document.getElementById("rro-save");
      if (el) el.textContent = text ? "  \u00b7  " + text : "";
    }

    function scheduleSave() {
      if (!soma || !canEdit) return;
      setSave("saving\u2026");
      clearTimeout(timer);
      timer = setTimeout(function () {
        var payload = JSON.parse(JSON.stringify(doc));
        soma.state.put(payload).then(function () {
          lastPutJson = JSON.stringify(payload);
          setSave("saved " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
        }).catch(function () { setSave("could not save \u2014 will retry on next change"); });
      }, 1200);
    }

    function refreshProgress() {
      var items = all(".rro-item");
      var done = items.filter(function (li) { return li.classList.contains("done"); }).length;
      var strong = document.querySelector("#rro-progress strong");
      if (strong) strong.textContent = done + " of " + items.length + " done";
      var fill = document.getElementById("rro-bar-fill");
      if (fill) fill.style.width = items.length ? Math.round((done / items.length) * 100) + "%" : "0";
      all("[data-rro-count]").forEach(function (chip) {
        var phase = chip.getAttribute("data-rro-count");
        var list = all('.rro-item[data-id^="' + phase + '"]');
        var d = list.filter(function (li) { return li.classList.contains("done"); }).length;
        chip.textContent = d + "/" + list.length;
      });
    }

    function setItemState(li, state) {
      var box = li.querySelector(".rro-box");
      var note = li.querySelector(".rro-note");
      if (box) box.checked = !!(state && state.d);
      if (note && state && state.n) note.value = state.n;
      li.classList.toggle("done", !!(state && state.d));
    }

    function wireItems() {
      all(".rro-item").forEach(function (li) {
        var id = li.getAttribute("data-id");
        var box = li.querySelector(".rro-box");
        var note = li.querySelector(".rro-note");
        if (box) box.addEventListener("change", function () {
          touched.checks[id] = true;
          doc.checks[id] = doc.checks[id] || {};
          doc.checks[id].d = box.checked;
          li.classList.toggle("done", box.checked);
          refreshProgress();
          scheduleSave();
        });
        if (note) note.addEventListener("input", function () {
          touched.checks[id] = true;
          doc.checks[id] = doc.checks[id] || {};
          doc.checks[id].n = note.value;
          scheduleSave();
        });
      });
    }

    function wireFacts() {
      all("[data-rro-fact]").forEach(function (inp) {
        var key = inp.getAttribute("data-rro-fact");
        inp.addEventListener("input", function () {
          touched.facts[key] = true;
          doc.facts[key] = inp.value;
          scheduleSave();
        });
      });
    }

    function renderLog() {
      var list = document.getElementById("rro-log-list");
      if (!list) return;
      list.textContent = "";
      doc.log.forEach(function (entry) {
        var li = document.createElement("li");
        var time = document.createElement("time");
        var d = new Date(entry.t);
        time.textContent = isNaN(d) ? "" : d.toLocaleDateString([], { day: "numeric", month: "short" }) + " " + d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        var p = document.createElement("p");
        p.textContent = entry.x;
        li.appendChild(time);
        li.appendChild(p);
        if (canEdit) {
          var btn = document.createElement("button");
          btn.type = "button";
          btn.textContent = "remove";
          btn.addEventListener("click", function () {
            doc.log = doc.log.filter(function (e) { return e.t !== entry.t; });
            renderLog();
            scheduleSave();
          });
          li.appendChild(btn);
        }
        list.appendChild(li);
      });
    }

    function wireLogForm() {
      var text = document.getElementById("rro-log-text");
      var add = document.getElementById("rro-log-add");
      if (!text || !add) return;
      add.addEventListener("click", function () {
        var value = text.value.trim();
        if (!value) return;
        var entry = { t: now(), x: value };
        doc.log.unshift(entry);
        touched.log.push(entry);
        text.value = "";
        renderLog();
        scheduleSave();
      });
    }

    function applyEditable() {
      var ro = !canEdit;
      all(".rro-box, .rro-note, [data-rro-fact], .rro-log-input").forEach(function (el) { el.disabled = ro; });
      var add = document.getElementById("rro-log-add");
      if (add) add.disabled = ro;
      var banner = document.getElementById("rro-banner");
      if (banner && !soma) banner.hidden = false;
      if (banner && soma && !canEdit) {
        banner.hidden = false;
        var p = banner.querySelector("p");
        if (p) p.textContent = "You are signed in as a viewer, so this page is read-only. Ask the owner to make you an editor to tick items and save notes.";
      }
    }

    function hydrate(remote) {
      if (remote && typeof remote === "object") {
        /* Merge, don't replace: edits made between boot() and get() resolving
           (slow links) must survive hydration, or the debounced put would
           persist the pre-edit doc. Untouched keys take the server copy. */
        Object.keys(remote.checks || {}).forEach(function (id) {
          if (!touched.checks[id]) doc.checks[id] = remote.checks[id];
        });
        Object.keys(remote.facts || {}).forEach(function (k) {
          if (!touched.facts[k]) doc.facts[k] = remote.facts[k];
        });
        var rlog = Array.isArray(remote.log) ? remote.log : [];
        var seen = {};
        rlog.forEach(function (e) { seen[e.t] = true; });
        doc.log = rlog.concat(touched.log.filter(function (e) { return !seen[e.t]; }))
          .sort(function (a, b) { return a.t < b.t ? 1 : -1; });
      }
      all(".rro-item").forEach(function (li) { setItemState(li, doc.checks[li.getAttribute("data-id")]); });
      all("[data-rro-fact]").forEach(function (inp) {
        var v = doc.facts[inp.getAttribute("data-rro-fact")];
        if (v) inp.value = v;
      });
      renderLog();
      refreshProgress();
      /* A put that fired before hydration (race window) carries only the
         raced subset; last-write-wins would wipe the server's other entries.
         Re-put the merged doc when it has already diverged. */
      if (lastPutJson !== null && JSON.stringify(doc) !== lastPutJson) scheduleSave();
    }

    wireItems();
    wireFacts();
    wireLogForm();
    applyEditable();

    if (soma) {
      soma.state.get().then(function (remote) { hydrate(remote); }).catch(function () {
        hydrate(null);
        if (canEdit) setSave("saved copy unavailable \u2014 changes still save");
      });
    } else {
      hydrate(null);
    }

    if (soma && canEdit) {
      var mount = document.getElementById("rro-attach");
      if (mount && typeof soma.attachments === "object" && typeof soma.attachments.mount === "function") {
        try { soma.attachments.mount(mount); } catch (e) { /* widget unavailable */ }
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
