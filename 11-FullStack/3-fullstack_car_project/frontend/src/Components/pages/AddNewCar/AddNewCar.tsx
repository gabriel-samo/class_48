import { ChangeEvent, useState } from "react";
import "./AddNewCar.css";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Car } from "../../../model/Car";
import { addCar } from "../../../store/carsSlice";
import { useNavigate } from "react-router-dom";
import notify from "../../../Utils/Notify";
import { addNewToken } from "../../../store/userSlice";

function AddNewCar(): JSX.Element {
  const CAR_URL = "http://localhost:8080/vehicles/car/";

  const [carNumber, setCarNumber] = useState("");
  const [carDetails, setCarDetails] = useState<Car | null>(null);

  const loggedUser = useAppSelector((state) => state.user.loggedUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleSearch() {
    axios
      .get(CAR_URL + carNumber, {
        headers: {
          Authorization: `Bearer ${loggedUser?.userToken}`,
        },
      })
      .then((res) => {
        dispatch(addNewToken(res.headers["authorization"].split(" ")[1]));
        const result = res.data;
        setCarDetails(
          new Car(
            result.mispar_rechev,
            result.tozeret_nm,
            result.kinuy_mishari,
            result.sug_delek_nm,
            result.tzeva_rechev,
            result.shnat_yitzur
          )
        );
      })
      .catch((err) => {
        notify.error(err.response.data.msg);
      });
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setCarDetails((prevState) => {
      if (!prevState) return null;
      return { ...prevState, [event.target.name]: event.target.value };
    });
  }

  function handleAddCar() {
    if (carDetails) {
      dispatch(addCar(carDetails));
    }
    navigate("/");
  }

  return (
    <div className="AddNewCar">
      <div className="Box">
        <h2 className="text-4xl font-bold">Add Car</h2>
        <hr />
        <label htmlFor="carNumber">Car Number</label>
        <input
          className="text-black bg-yellow-50"
          id="carNumber"
          type="number"
          placeholder="Enter Car Number"
          onChange={(event) => setCarNumber(event.target.value)}
        />
        <input type="button" value="Search Car" onClick={handleSearch} />
      </div>
      {carDetails && (
        <div className="CarDetails">
          <p>
            <span className="detailLabel">Car Number: </span>
            {carDetails.carNumber}
          </p>
          <p>
            <span className="detailLabel">Manufacturer: </span>
            {carDetails.manufacturer}
          </p>
          <p>
            <span className="detailLabel">Model: </span>
            {carDetails.model}
          </p>
          <p>
            <span className="detailLabel">Fuel Type: </span>
            {carDetails.fuelType}
          </p>
          <p>
            <span className="detailLabel">Color: </span>
            {carDetails.color}
          </p>
          <p>
            <span className="detailLabel">Year: </span>
            {carDetails.year}
          </p>
          <p className="inputArea">
            <label htmlFor="km">KM: </label>
            <input
              type="number"
              name="km"
              id="km"
              placeholder='Enter K"M'
              onChange={handleChange}
            />
          </p>
          <p className="inputArea">
            <label htmlFor="hand">Hand: </label>
            <input
              type="number"
              name="hand"
              id="hand"
              placeholder="Enter Hand"
              onChange={handleChange}
            />
          </p>
          <p className="inputArea">
            <label htmlFor="desc">Description: </label>
            <input
              type="text"
              name="desc"
              id="desc"
              placeholder="Enter Description"
              onChange={handleChange}
            />
          </p>
          <p className="inputArea">
            <label htmlFor="img1">Image1: </label>
            <input
              type="text"
              name="img1"
              id="img1"
              placeholder="Enter Image 1 URL"
              onChange={handleChange}
            />
          </p>
          <p className="inputArea">
            <label htmlFor="img2">Image2: </label>
            <input
              type="text"
              name="img2"
              id="img2"
              placeholder="Enter Image 2 URL"
              onChange={handleChange}
            />
          </p>
          <p className="inputArea">
            <label htmlFor="img3">Image3: </label>
            <input
              type="text"
              name="img3"
              id="img3"
              placeholder="Enter Image 3 URL"
              onChange={handleChange}
            />
          </p>
          <input type="button" value="Add Car" onClick={handleAddCar} />
        </div>
      )}
    </div>
  );
}

export default AddNewCar;
