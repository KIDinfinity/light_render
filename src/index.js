import React from "react";
import ReactDOM from "react-dom/client"; // ← 注意这里的路径不同
import AppRouter from "./AppRouter";     // 你的路由入口
import "./index.css";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);