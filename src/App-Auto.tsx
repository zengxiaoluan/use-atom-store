import { memo } from "react";
import "./App.css";
import { createAutoStore, useAutoStore } from "./use-atom-store";

let testAutoStore = createAutoStore({ a: 1, b: 2, c: 3 });

function App() {
  let state = useAutoStore(testAutoStore);
  console.log("render A/B/C");

  state.a;
  state.b;
  state.c;

  return (
    <div>
      <button
        onClick={() => {
          state.a++;
        }}
      >
        parent
      </button>
      <A></A>
      <B></B>
      <C></C>
    </div>
  );
}

let A = memo(function A() {
  let state = useAutoStore(testAutoStore);
  console.log("render A");

  return <button onClick={() => testAutoStore.a++}>a{state.a}</button>;
});

let B = memo(function B() {
  let state = useAutoStore(testAutoStore);
  console.log("render B");

  return <button onClick={() => testAutoStore.b++}>b{state.b}</button>;
});

let C = memo(function C() {
  let state = useAutoStore(testAutoStore);
  console.log("render C");

  if (state.c > 5 && state.c < 10)
    return <button onClick={() => testAutoStore.c--}>c{state.c}</button>;

  return <button onClick={() => testAutoStore.c++}>c{state.c}</button>;
});

export default App;
