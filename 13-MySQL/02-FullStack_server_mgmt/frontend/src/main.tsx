import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import MainLayout from "./Components/layout/MainLayout/MainLayout.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <React.StrictMode>
      <MainLayout />
    </React.StrictMode>
  </BrowserRouter>
);
