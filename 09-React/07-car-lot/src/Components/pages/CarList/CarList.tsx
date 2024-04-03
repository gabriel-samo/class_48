import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import "./CarList.css";
import { removeCar } from "../../../store/carsSlice";
import { useState } from "react";
import DeletePrompt from "../../DeletePrompt";

function CarList(): JSX.Element {
  const [deleteIsVisible, setDeleteIsVisible] = useState(false);

  const carList = useAppSelector((state) => state.cars.cars);
  const dispatch = useAppDispatch();

  function handleOpenDeletePrompt() {
    setDeleteIsVisible(true);
  }

  function handleCloseDeletePrompt() {
    setDeleteIsVisible(false);
  }

  function handleCarDelete(carNumber: number) {
    dispatch(removeCar(carNumber));
  }

  return (
    <div className="CarList">
      <h1>Car List</h1>
      {carList.map((car) => (
        <div key={car.mispar_rechev} className="Box">
          {deleteIsVisible && (
            <DeletePrompt
              onClose={handleCloseDeletePrompt}
              onCarDelete={handleCarDelete}
              carNumber={car.mispar_rechev}
            />
          )}
          <div className="cardTitle">
            <h2>{car.mispar_rechev}</h2>
            <input
              type="button"
              value="Delete"
              onClick={handleOpenDeletePrompt}
            />
          </div>
          <hr />
          <p>
            <span>Manufacturer:</span> {car.tozeret_nm}
          </p>
          <p>
            <span>Model:</span> {car.kinuy_mishari}
          </p>
          <p>
            <span>Year:</span> {car.shnat_yitzur}
          </p>
          {car.km && (
            <p>
              <span>K"M:</span> {car.km}
            </p>
          )}
          <NavLink to={`/carDetail/${car.mispar_rechev}`}>More Details</NavLink>
        </div>
      ))}
    </div>
  );
}

export default CarList;
