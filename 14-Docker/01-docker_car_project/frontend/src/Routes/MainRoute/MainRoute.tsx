import { Route, Routes } from "react-router-dom";
import Page404 from "../../Components/pages/Page404/Page404";
import CarList from "../../Components/pages/CarList/CarList";
import AddNewCar from "../../Components/pages/AddNewCar/AddNewCar";
import CarDetails from "../../Components/pages/CarDetails/CarDetails";
import Register from "../../Components/pages/Register/Register";
import Login from "../../Components/pages/Login/Login";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import UserProfile from "../../Components/pages/UserProfile/UserProfile";
import ForgotPassword from "../../Components/pages/ForgotPassword/ForgotPassword";

function MainRoute(): JSX.Element {
  return (
    <div className="MainRoute">
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<CarList />} />
          <Route path="/addCar" element={<AddNewCar />} />
          <Route path="/carDetail/:carNumber" element={<CarDetails />} />
          <Route path="/userProfile/:userName" element={<UserProfile />} />
          <Route path="*" element={<Page404 />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}

export default MainRoute;
