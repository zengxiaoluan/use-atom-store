import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsxs("div", { children: [_jsx("button", { onClick: () => {
                    state.a++;
                }, children: "parent" }), _jsx(A, {}), _jsx(B, {}), _jsx(C, {})] }));
}
let A = memo(function A() {
    let state = useAutoStore(testAutoStore);
    console.log("render A");
    return _jsxs("button", { onClick: () => testAutoStore.a++, children: ["a", state.a] });
});
let B = memo(function B() {
    let state = useAutoStore(testAutoStore);
    console.log("render B");
    return _jsxs("button", { onClick: () => testAutoStore.b++, children: ["b", state.b] });
});
let C = memo(function C() {
    let state = useAutoStore(testAutoStore);
    console.log("render C");
    if (state.c > 5 && state.c < 10)
        return _jsxs("button", { onClick: () => testAutoStore.c--, children: ["c", state.c] });
    return _jsxs("button", { onClick: () => testAutoStore.c++, children: ["c", state.c] });
});
export default App;
