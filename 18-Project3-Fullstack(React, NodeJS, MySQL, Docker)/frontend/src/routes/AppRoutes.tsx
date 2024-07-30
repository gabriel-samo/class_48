import Home from "../pages/Home";
import Login from "../pages/Login";
import About from "../pages/About";
import Page404 from "../pages/Page404";
import Register from "../pages/Register";
import Vacations from "../pages/Vacations";
import MyFooter from "../components/MyFooter";
import MyHeader from "../components/MyHeader";
import PrivateRoute from "../components/PrivateRoute";

import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

function AppRoutes() {
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     if (img) {
  //       const res = await uploadImage(img);
  //       console.log(res);
  //     } else {
  //       console.log("No image");
  //     }
  //   } catch (error: any) {
  //     console.log(error);
  //   }
  // };

  // Scroll restoration
  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  return (
    <>
      <MyHeader />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/vacations" element={<Vacations />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <MyFooter />
    </>
  );
}

export default AppRoutes;
