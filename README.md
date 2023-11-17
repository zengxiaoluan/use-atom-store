# use-atom-store

This library is aim to handle outer store's state in your react component that which solved the render accurately problem, I hope you will enjoy it.

```shell
npm i use-atom-store -S
```

You can use this like:

```jsx
import { createAtomStore, useAtomStore } from "use-atom-store";

let myStore = createAtomStore({ count: 0, hello: "hello" }); // create a store

function changeHello() {
  myStore.setState((prev) => {
    return {
      ...prev,
      hello: prev.hello + "world",
    };
  });
}

function changeCount() {
  myStore.setState((prev) => {
    return {
      ...prev,
      count: prev.count + 1,
    };
  });
}

export default function App() {
  return (
    <main>
      <button onClick={changeHello}>Change Hello</button>
      <button onClick={changeCount}>Change Count</button>

      <DisplayHello></DisplayHello>
      <DisplayCount></DisplayCount>
    </main>
  );
}

let helloRenderTimes = 0;
function DisplayHello() {
  let [state, setState] = useAtomStore(myStore, (state) => ({
    hello: state.hello,
  }));

  return (
    <div
      onClick={() => {
        setState((prev) => ({ ...prev, hello: prev.hello + "world" }));
      }}
    >
      {state.hello} - helloRenderTimes: {++helloRenderTimes}
    </div>
  );
}

let countRenderTimes = 0;
function DisplayCount() {
  let [state, setState] = useAtomStore(myStore, (state) => ({
    count: state.count,
  }));

  return (
    <div
      onClick={() => {
        setState((prev) => ({ ...prev, count: prev.count + 1 }));
      }}
    >
      {state.count} - countRenderTimes: {++countRenderTimes}
    </div>
  );
}
```

## Automatic collect state of a store

If you want automatic collect state which you used in current component, you can use another api `createAutoStore` and `useAutoStore`, below is the demo:

```javascript
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
```
