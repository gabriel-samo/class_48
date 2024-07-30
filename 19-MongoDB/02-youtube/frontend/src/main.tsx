import "./index.css";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { store } from "./store/store.ts";
import { BrowserRouter } from "react-router-dom";
import MainLayout from "./Components/Layouts/MainLayout/MainLayout.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  </Provider>
);
