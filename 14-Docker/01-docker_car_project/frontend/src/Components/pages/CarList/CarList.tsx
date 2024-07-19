import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import "./CarList.css";
import { removeCar } from "../../../store/carsSlice";
import { useState } from "react";
import DeletePrompt from "../../DeletePrompt";

function CarList(): JSX.Element {
  const [deleteIsVisible, setDeleteIsVisible] = useState(false);
  const [carToDelete, setCarToDelete] = useState<number>();

  const carList = useAppSelector((state) => state.cars.cars);
  const dispatch = useAppDispatch();

  function handleOpenDeletePrompt(carNumber: number) {
    setCarToDelete(carNumber);
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
      <h1 className="mt-8 mb-4 text-4xl font-bold">Car List</h1>
      {deleteIsVisible && (
        <DeletePrompt
          onClose={handleCloseDeletePrompt}
          onCarDelete={handleCarDelete}
          carNumber={carToDelete!}
        />
      )}
      {carList.map((car) => (
        <div key={car.carNumber} className="Box">
          <div className="cardTitle">
            <h2>{car.carNumber}</h2>
            <input
              type="button"
              value="Delete"
              onClick={() => handleOpenDeletePrompt(car.carNumber)}
            />
          </div>
          <hr />
          <p>
            <span>Manufacturer:</span> {car.manufacturer}
          </p>
          <p>
            <span>Model:</span> {car.model}
          </p>
          <p>
            <span>Year:</span> {car.year}
          </p>
          <p>
            <span>K"M:</span> {car.km ? car.km : "N/A"}
          </p>
          <NavLink to={`/carDetail/${car.carNumber}`}>More Details</NavLink>
        </div>
      ))}
    </div>
  );
}

export default CarList;
