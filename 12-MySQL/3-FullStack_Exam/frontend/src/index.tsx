import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "react-datepicker/dist/react-datepicker.css";
import MainLayout from "./Components/layout/MainLayout/MainLayout";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <MainLayout />
    </React.StrictMode>
  </BrowserRouter>
);
