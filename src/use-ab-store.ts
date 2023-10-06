import { useSyncExternalStore } from "react";

export class ABStore<T extends any, P extends { [k: string]: (...args: any) => void }> {
  protected proxy!: T;
  private state: T;

  private initState(v: T) {
    let that = this;

    this.proxy = new Proxy(
      { ...(v as any) },

      {
        get(target, prop, receiver) {
          return Reflect.get(target, prop, receiver);
        },

        set(target, prop, v, receiver) {
          let temp = Reflect.set(target, prop, v, receiver);

          that.state = {
            ...target,
          };

          that.emitChange();

          return temp;
        },
      }
    );
  }

  constructor(state: T, methods: P) {
    this.state = state;
    this.initState(state);

    for (const key in methods) {
      let fn = methods[key];

      (this as any)[key] = (...args: any) => {
        return fn(...args, this.proxy);
      };
    }
  }

  private listener = new Set<any>();

  private getSnapshot() {
    return this.state;
  }

  private emitChange() {
    for (let fn of this.listener) fn();
  }

  private subscribe(listener: any) {
    this.listener.add(listener);

    return () => {
      this.listener.delete(listener);
    };
  }

  useStore(): T {
    let state = useSyncExternalStore(this.subscribe.bind(this), this.getSnapshot.bind(this));

    return state;
  }
}
