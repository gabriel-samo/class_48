import "./styles/styles.css";

// import { StrictMode } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { BrowserRouter } from "react-router-dom";

import ReactDOM from "react-dom/client";
import ThemeProvider from "./components/ThemeProvider.tsx";
import AppRoutes from "./routes/AppRoutes.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider>
        {/* <StrictMode> */}
        <AppRoutes />
        {/* </StrictMode> */}
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);
