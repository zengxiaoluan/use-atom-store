import { useSyncExternalStore } from "react";

export abstract class ABStore<T extends Object> {
  protected state = new Proxy<T>({} as T, {});
  private retState: any;

  private initState(v: T) {
    let that = this;

    this.state = new Proxy(
      { ...v },

      {
        get(target, prop, receiver) {
          return Reflect.get(target, prop, receiver);
        },

        set(target, prop, v, receiver) {
          let temp = Reflect.set(target, prop, v, receiver);

          that.retState = {
            ...target,
          };

          that.emitChange();

          return temp;
        },
      }
    );
  }

  constructor(state: T) {
    this.initState(state);
  }

  private listener = new Set<any>();

  private getSnapshot() {
    return this.retState || this.state;
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

  useStore() {
    let state = useSyncExternalStore(
      this.subscribe.bind(this),
      this.getSnapshot.bind(this)
    );

    return state;
  }
}
