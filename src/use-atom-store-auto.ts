import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";

let mapTrackProxy = new WeakMap();
let mapProxy2Target = new WeakMap();
let subscribeMap = new WeakMap();
let listenerMap = new WeakMap();

export function createAutoStore<T extends Record<string, any> = {}>(store: T) {
  return createProxy(store);
}

function createProxy<T extends Record<string, any> = {}>(
  target: T,
  affected?: Set<string>
) {
  const handler = {
    get(target: T, prop: keyof T) {
      affected?.add(prop as any);

      return target[prop];
    },

    set(target: T, prop: keyof T, value: any) {
      if (affected?.size) return false;

      target[prop] = value;

      for (const fn of listenerMap.get(proxy)) fn();

      return true;
    },
  };

  let proxy = new Proxy(target, handler as any);

  if (!affected) {
    mapTrackProxy.set(proxy, true);
    mapProxy2Target.set(proxy, target);
    subscribeMap.set(
      proxy,
      (() => {
        let lis = new Set();
        listenerMap.set(proxy, lis);

        return (fn: any) => {
          lis.add(fn);

          return () => {
            lis.delete(fn);
          };
        };
      })()
    );
  }

  return proxy;
}

export function useAutoStore<T extends ReturnType<typeof createAutoStore>>(
  proxy: T
) {
  if (!mapTrackProxy.has(proxy)) throw new Error("Plz check code");

  let isRender = true;
  useSyncExternalStore(
    subscribeMap.get(proxy),
    useMemo(() => {
      let cache = {} as any;

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
    }, [])
  );
  isRender = false;

  let curAffected = new Set<string>([]);
  let lastAffected = useRef<Set<string>>(curAffected);

  useEffect(() => {
    lastAffected.current = curAffected;
  });

  return createProxy(mapProxy2Target.get(proxy), curAffected) as T;
}
