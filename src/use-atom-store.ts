import { useMemo, useSyncExternalStore } from "react";
export * from "./use-atom-store-auto";

let count = 0;
class AtomStore<T = {}> {
  count = 0;
  state: T;

  constructor(state: T) {
    this.state = state;
    this.count = ++count;
  }

  private listener = new Set<any>();

  setState(fn: (s: T) => T) {
    let v = fn(this.state);
    this.state = v;
    this.emitChange();
  }

  private emitChange() {
    for (let fn of this.listener) fn();
  }

  subscribe(listener: any) {
    this.listener.add(listener);

    return () => {
      this.listener.delete(listener);
    };
  }

  getState() {
    return this.state;
  }
}

export function createAtomStore<T extends AtomStore["state"]>(s: T) {
  return new AtomStore(s);
}

export function useAtomStore<T extends AtomStore>(
  store: T,
  selector?: (state: T["state"]) => Partial<T["state"]>
) {
  let state = store.getState() as T["state"];

  if (selector) {
    state = selector(state);
  }

  let state2 = useSyncExternalStore(
    store.subscribe.bind(store),
    useMemo(() => {
      let cache = state;

      return () => {
        let newState = store.getState() as T["state"];
        for (const key in cache) {
          if (!Object.is(cache[key], newState[key])) {
            cache = {
              ...cache,
              [key]: newState[key],
            };
          }
        }

        return cache;
      };
    }, [])
  );

  let setState = (fn: (state: T["state"]) => T["state"]) => {
    store.setState(fn);
  };

  return [state2, setState] as const;
}
