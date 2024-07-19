import "./index.css";
import ReactDOM from "react-dom/client";
import MainLayout from "./Components/layout/MainLayout/MainLayout";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <MainLayout />
  </BrowserRouter>
);
