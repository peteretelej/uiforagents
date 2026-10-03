// Copy-to-clipboard behavior on @zag-js/clipboard: the machine owns the copy
// and the copied feedback window; this binding keeps the label-as-feedback
// pattern ("Copy" / "Copied!"). Install the machines first:
// npm i @zag-js/clipboard
import { connect, machine } from "@zag-js/clipboard";
import {
  createScope,
  findTransition,
  getExitEnterStates,
  hasTag,
  INIT_STATE,
  matchesState,
  resolveStateValue,
} from "@zag-js/core";

// Vanilla machine runner: the subscription-based interpreter zag's adapter
// guide prescribes for "subscriptions without a component runtime", ported
// from the official React adapter onto @zag-js/core's transition helpers.
// All state-machine logic lives in the @zag-js packages.
function runMachine(machineConfig, userProps = {}, onUpdate) {
  const scope = createScope({ id: userProps.id, ids: userProps.ids, getRootNode: userProps.getRootNode });
  let baseProps = userProps;
  let resolved = machineConfig.props?.({ props: baseProps, scope }) ?? baseProps;
  const prop = (key) => resolved[key];

  const bindable = (init) => {
    const def = init();
    const cell = { current: def.value ?? def.defaultValue };
    return {
      initial: cell.current,
      ref: cell,
      get: () => cell.current,
      set(value) {
        const prev = cell.current;
        const next = typeof value === "function" ? value(prev) : value;
        cell.current = next;
        if (!Object.is(next, prev)) def.onChange?.(next, prev);
        // context changes re-run watch (the adapter re-render equivalent)
        runWatch();
      },
      invoke(next, prev) {
        def.onChange?.(next, prev);
      },
      hash(value) {
        return def.hash?.(value) ?? String(value);
      },
    };
  };

  const eventRef = { current: { type: "" } };
  const previousEventRef = { current: null };
  const getEvent = () => ({
    ...eventRef.current,
    current: () => eventRef.current,
    previous: () => previousEventRef.current,
  });

  const context = machineConfig.context?.({
    prop,
    bindable,
    scope,
    flush: (fn) => queueMicrotask(fn),
    getContext: () => ctx,
    getComputed: () => computed,
    getRefs: () => refs,
    getEvent,
  });
  const contextRef = { current: context };
  const ctx = {
    get: (key) => contextRef.current[key].get(),
    set: (key, value) => contextRef.current[key].set(value),
    initial: (key) => contextRef.current[key].initial,
    hash(key) {
      const cell = contextRef.current[key];
      return cell.hash(cell.get());
    },
  };
  const refsSource = machineConfig.refs?.({ prop, context: ctx }) ?? {};
  const refs = {
    get: (key) => refsSource[key],
    set: (key, value) => {
      refsSource[key] = value;
    },
  };

  const effects = new Map();
  const transitionRef = { current: null };
  let status = "Not Started";

  const getParams = () => ({
    state: getState(),
    context: ctx,
    event: getEvent(),
    prop,
    send,
    action,
    guard,
    track,
    refs,
    computed,
    flush: (fn) => queueMicrotask(fn),
    scope,
    choose,
  });
  const action = (keys) => {
    const strs = typeof keys === "function" ? keys(getParams()) : keys;
    if (!strs) return;
    for (const s of strs) machineConfig.implementations?.actions?.[s]?.(getParams());
  };
  const guard = (g) => {
    if (typeof g === "function") return g(getParams());
    return machineConfig.implementations?.guards?.[g]?.(getParams());
  };
  const runEffect = (keys) => {
    const strs = typeof keys === "function" ? keys(getParams()) : keys;
    if (!strs) return;
    const cleanups = [];
    for (const s of strs) {
      const cleanup = machineConfig.implementations?.effects?.[s]?.(getParams());
      if (cleanup) cleanups.push(cleanup);
    }
    return () => cleanups.forEach((fn) => fn?.());
  };
  // zag transition maps hold one transition or an array of guarded ones
  const choose = (transitions) => {
    const list = transitions == null ? [] : Array.isArray(transitions) ? transitions : [transitions];
    return list.find((t) => (t.guard ? !!guard(t.guard) : true));
  };
  const computed = (key) =>
    machineConfig.computed?.[key]?.({
      context: ctx,
      event: getEvent(),
      prop,
      refs,
      scope,
      computed,
    });

  // watch() tracks re-run their effect when a dependency changes after start
  let trackIndex = 0;
  const trackStates = new Map();
  const track = (deps, effect) => {
    const index = trackIndex++;
    const values = deps.map((d) => (typeof d === "function" ? d() : d));
    const seen = trackStates.get(index);
    trackStates.set(index, { values });
    if (seen && seen.values.some((v, i) => !Object.is(v, values[i]))) effect();
  };
  const runWatch = () => {
    trackIndex = 0;
    machineConfig.watch?.(getParams());
  };

  const getState = () => ({
    ...state,
    matches: (...values) => values.some((v) => matchesState(state.ref.current, v)),
    hasTag: (tag) => hasTag(machineConfig, state.ref.current, tag),
  });
  const onStateChange = (nextState, prevState) => {
    const { exiting, entering } = getExitEnterStates(machineConfig, prevState, nextState, transitionRef.current?.reenter);
    for (const item of exiting) {
      effects.get(item.path)?.();
      effects.delete(item.path);
    }
    for (const item of exiting) action(item.state?.exit);
    action(transitionRef.current?.actions);
    for (const item of entering) {
      const cleanup = runEffect(item.state?.effects);
      if (cleanup) {
        const existing = effects.get(item.path);
        effects.set(item.path, existing ? () => (existing(), cleanup()) : cleanup);
      }
    }
    if (prevState === INIT_STATE) {
      action(machineConfig.entry);
      const cleanup = runEffect(machineConfig.effects);
      if (cleanup) effects.set(INIT_STATE, cleanup);
    }
    for (const item of entering) action(item.state?.entry);
    onUpdate?.();
    runWatch();
  };
  const state = bindable(() => ({
    defaultValue: resolveStateValue(machineConfig, machineConfig.initialState({ prop })),
    onChange: onStateChange,
  }));
  const transition = (event) => {
    if (status !== "Started") return;
    previousEventRef.current = eventRef.current;
    eventRef.current = event;
    const currentState = state.ref.current;
    const { transitions, source } = findTransition(machineConfig, currentState, event.type);
    const selected = choose(transitions ?? []);
    if (!selected) return;
    transitionRef.current = selected;
    const target = resolveStateValue(machineConfig, selected.target ?? currentState, source);
    if (target !== currentState) {
      state.set(target);
    } else if (selected.reenter) {
      state.invoke(currentState, currentState);
    } else {
      action(selected.actions ?? []);
    }
  };
  const send = (event) => {
    queueMicrotask(() => transition(event));
  };

  return {
    state: getState(),
    send,
    context: ctx,
    prop,
    scope,
    refs,
    computed,
    event: getEvent(),
    getStatus: () => status,
    setProps(next) {
      baseProps = { ...baseProps, ...next };
      resolved = machineConfig.props?.({ props: baseProps, scope }) ?? baseProps;
      runWatch();
    },
    start() {
      status = "Started";
      state.invoke(state.initial, INIT_STATE);
      runWatch();
    },
    stop() {
      status = "Stopped";
      for (const cleanup of effects.values()) cleanup();
      effects.clear();
      queueMicrotask(() => action(machineConfig.exit));
    },
  };
}

const normalizeProps = {
  element: (props) => props,
  label: (props) => props,
  input: (props) => props,
  button: (props) => props,
};

document.querySelectorAll(".uifa-code-block").forEach((block, index) => {
  const button = block.querySelector("[data-uifa-slot='copy']");
  const code = block.querySelector("[data-uifa-slot='code']");
  if (!button || !code) return;

  const render = (api) => {
    button.textContent = api.copied ? "Copied!" : "Copy";
  };
  const service = runMachine(
    machine,
    { id: `uifa-clipboard-${index}`, timeout: 2000, defaultValue: code.textContent.trim() },
    () => render(connect(service, normalizeProps))
  );
  service.start();
  render(connect(service, normalizeProps));
  button.addEventListener("click", () => {
    const api = connect(service, normalizeProps);
    api.setValue(code.textContent.trim());
    api.copy();
  });
});
