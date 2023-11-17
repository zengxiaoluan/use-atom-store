import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { memo } from "react";
import "./App.css";
import { createAtomStore, useAtomStore } from "./use-atom-store";
let countStore = createAtomStore({ count: 0, str: "-" });
function App() {
    let [state, setState] = useAtomStore(countStore);
    return (_jsxs("div", { children: [_jsxs("button", { onClick: () => {
                    setState((prev) => {
                        return { ...prev, str: prev.str + "-" };
                    });
                }, children: [state.str, state.count] }), _jsx(A, {})] }));
}
let A = memo(function A() {
    let [state, setState] = useAtomStore(countStore, (state) => ({
        count: state.count,
    }));
    console.log(state);
    return (_jsxs(_Fragment, { children: [_jsxs("button", { onClick: () => {
                    setState((prev) => {
                        return { ...prev, count: prev.count + 1 };
                    });
                }, children: ["click ", state.count] }), _jsx(Comp, {})] }));
});
function Comp() {
    let [{ count }] = useAtomStore(countStore, (state) => ({
        count: state.count,
    }));
    console.log(count);
    return _jsxs("div", { children: ["display state:", count] });
}
export default App;
