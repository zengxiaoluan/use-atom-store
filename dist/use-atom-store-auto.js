import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";
let mapTrackProxy = new WeakMap();
let mapProxy2Target = new WeakMap();
let subscribeMap = new WeakMap();
let listenerMap = new WeakMap();
export function createAutoStore(store) {
    return createProxy(store);
}
function createProxy(target, affected) {
    const handler = {
        get(target, prop) {
            affected?.add(prop);
            return target[prop];
        },
        set(target, prop, value) {
            if (affected?.size)
                return false;
            target[prop] = value;
            for (const fn of listenerMap.get(proxy))
                fn();
            return true;
        },
    };
    let proxy = new Proxy(target, handler);
    if (!affected) {
        mapTrackProxy.set(proxy, true);
        mapProxy2Target.set(proxy, target);
        subscribeMap.set(proxy, (() => {
            let lis = new Set();
            listenerMap.set(proxy, lis);
            return (fn) => {
                lis.add(fn);
                return () => {
                    lis.delete(fn);
                };
            };
        })());
    }
    return proxy;
}
export function useAutoStore(proxy) {
    if (!mapTrackProxy.has(proxy))
        throw new Error("Plz check code");
    let isRender = true;
    useSyncExternalStore(subscribeMap.get(proxy), useMemo(() => {
        let cache = {};
        return () => {
            if (!isRender)
                for (const k of lastAffected.current) {
                    let v = proxy[k];
                    if (!Object.is(v, cache[k])) {
                        cache = {
                            ...cache,
                            [k]: v,
                        };
                    }
                }
            // console.warn(cache);
            return cache;
        };
    }, []));
    isRender = false;
    let curAffected = new Set([]);
    let lastAffected = useRef(curAffected);
    useEffect(() => {
        lastAffected.current = curAffected;
    });
    return createProxy(mapProxy2Target.get(proxy), curAffected);
}
