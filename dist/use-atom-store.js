import { useMemo, useSyncExternalStore } from "react";
export * from "./use-atom-store-auto";
let count = 0;
class AtomStore {
    constructor(state) {
        Object.defineProperty(this, "count", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "state", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "listener", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Set()
        });
        this.state = state;
        this.count = ++count;
    }
    setState(fn) {
        let v = fn(this.state);
        this.state = v;
        this.emitChange();
    }
    emitChange() {
        for (let fn of this.listener)
            fn();
    }
    subscribe(listener) {
        this.listener.add(listener);
        return () => {
            this.listener.delete(listener);
        };
    }
    getState() {
        return this.state;
    }
}
export function createAtomStore(s) {
    return new AtomStore(s);
}
export function useAtomStore(store, selector) {
    let state = store.getState();
    if (selector) {
        state = selector(state);
    }
    let state2 = useSyncExternalStore(store.subscribe.bind(store), useMemo(() => {
        let cache = state;
        return () => {
            let newState = store.getState();
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
    }, []));
    let setState = (fn) => {
        store.setState(fn);
    };
    return [state2, setState];
}
