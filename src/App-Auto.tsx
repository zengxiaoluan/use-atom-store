import { memo } from "react";
import "./App.css";
import { createAutoStore, useAutoStore } from "./use-atom-store-auto";

let testAutoStore = createAutoStore({ a: 1, b: 2 });

function App() {
  let state = useAutoStore(testAutoStore);
  console.log("render a: App");

  return (
    <div>
      <button
        onClick={() => {
          testAutoStore.a++;
        }}
      >
        a{state.a}
      </button>
      <A></A>
    </div>
  );
}

let A = memo(function A() {
  let state = useAutoStore(testAutoStore);

  console.log("render b: A");

  return (
    <>
      <button
        onClick={() => {
          testAutoStore.b++;
        }}
      >
        b{state.b}
      </button>
      {/* <Comp></Comp> */}
    </>
  );
});

function Comp() {
  let state = useAutoStore(testAutoStore);
  console.log("render a: Comp");

  if (state.a > 5 && state.a < 10) return <></>;

  return <div>display state a:{state.a}</div>;
}

export default App;
