import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App/App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./App/Home";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  </BrowserRouter>
  // </React.StrictMode>
);
