import ReactDOM from "react-dom/client";
import "./index.css";
import MainLayout from "./Components/layout/MainLayout/MainLayout";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  </Provider>
);
