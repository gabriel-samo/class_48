import { Route, Routes } from "react-router-dom";
import Page404 from "../../Components/pages/Page404/Page404";
import CarList from "../../Components/pages/CarList/CarList";
import AddNewCar from "../../Components/pages/AddNewCar/AddNewCar";
import CarDetails from "../../Components/pages/CarDetails/CarDetails";

function MainRoute(): JSX.Element {
  return (
    <div className="MainRoute">
      <Routes>
        <Route path="/" element={<CarList />} />
        <Route path="/addCar" element={<AddNewCar />} />
        <Route path="/carDetail/:carNumber" element={<CarDetails />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default MainRoute;
