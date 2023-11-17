export declare function createAutoStore<T extends Record<string, any> = {}>(store: T): T;
export declare function useAutoStore<T extends ReturnType<typeof createAutoStore>>(proxy: T): T;
