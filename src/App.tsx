import { Component, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return <A></A>;
}

export default App;

import { ABStore } from "./use-ab-store";

export function A() {
  let store = countStore.useStore();
  console.log(store);

  return (
    <>
      {store.display && "sdfsf"}
      <button
        onClick={() => {
          countStore.inc(1);
        }}
      >
        inc {store.count}
      </button>

      <button
        onClick={() => {
          countStore.inc(-1);
        }}
      >
        dec {store.count}
      </button>

      <Comp></Comp>
    </>
  );
}

function Comp() {
  let store = countStore.useStore();

  return <div>display state:{store.count}</div>;
}

function createCountStore<T>(state: T) {
  let m = {
    inc(step: number, state?: T) {
      if (state) (state as any).count += step;

      if (state.count % 2) {
        state.display = false;
      } else {
        state.display = true;
      }
    },
  };

  let store = new ABStore<T, typeof m>(state, m);

  type A = typeof store & typeof m;

  return store as unknown as A;
}

let countStore = createCountStore({ count: 0, display: true });
