import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return <A></A>;
}

export default App;

import { ABStore } from "./use-ab-store";

export function A() {
  let count = countStore.useStore();
  console.log(count);

  return (
    <>
      <button
        onClick={() => {
          countStore.inc(2);
        }}
      >
        click {count.count}
      </button>
      <Comp></Comp>
    </>
  );
}

function Comp() {
  let count = countStore.useStore();

  return <div>display state:{count.count}</div>;
}

type Compute<T extends any> = T extends Object ? { [P in keyof T]: T[P] } : any;

class CountStore<T extends Object> extends ABStore<T> {
  constructor(state: T) {
    super(state);
  }

  inc(step: number) {
    (this.state as T).count += step;
  }
}

let countStore = new CountStore({ count: 0 });
