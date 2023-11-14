import { memo, useCallback } from "react";
import "./App.css";
import { createAtomStore, useAtomStore } from "./use-atom-store";

let countStore = createAtomStore({ count: 0, str: "-" });

function App() {
  let [state, setState] = useAtomStore(countStore);

  return (
    <div>
      <button
        onClick={() => {
          setState((prev) => {
            return { ...prev, str: prev.str + "-" };
          });
        }}
      >
        {state.str}
        {state.count}
      </button>
      <A></A>
    </div>
  );
}

let A = memo(function A() {
  let [state, setState] = useAtomStore(countStore, (state) => ({
    count: state.count,
  }));
  console.log(state);

  return (
    <>
      <button
        onClick={() => {
          setState((prev) => {
            return { ...prev, count: prev.count + 1 };
          });
        }}
      >
        click {state.count}
      </button>
      <Comp></Comp>
    </>
  );
});

function Comp() {
  let [{ count }] = useAtomStore(countStore, (state) => ({
    count: state.count,
  }));
  console.log(count);

  return <div>display state:{count}</div>;
}

export default App;
