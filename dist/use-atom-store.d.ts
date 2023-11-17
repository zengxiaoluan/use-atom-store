export * from "./use-atom-store-auto";
declare class AtomStore<T = {}> {
    count: number;
    state: T;
    constructor(state: T);
    private listener;
    setState(fn: (s: T) => T): void;
    private emitChange;
    subscribe(listener: any): () => void;
    getState(): T;
}
export declare function createAtomStore<T extends AtomStore["state"]>(s: T): AtomStore<T>;
export declare function useAtomStore<T extends AtomStore>(store: T, selector?: (state: T["state"]) => Partial<T["state"]>): readonly [T["state"], (fn: (state: T["state"]) => T["state"]) => void];
