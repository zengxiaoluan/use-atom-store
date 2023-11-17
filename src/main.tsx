import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import AppAuto from "./App-Auto.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppAuto />
  </React.StrictMode>
);
