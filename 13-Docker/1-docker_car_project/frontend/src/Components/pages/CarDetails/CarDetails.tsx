import { useParams } from "react-router-dom";
import "./CarDetails.css";
import { useAppSelector } from "../../../store/hooks";

function CarDetails(): JSX.Element {
  const params = useParams();
  const carDetails = useAppSelector((state) =>
    state.cars.cars.find((car) => car.carNumber === parseInt(params.carNumber!))
  );

  return (
    <div className="CarDetails Box">
      <h2>
        <span>Car Number:</span> <span>{carDetails?.carNumber}</span>
      </h2>
      <p>
        <span>Manufacturer:</span> <span>{carDetails?.manufacturer}</span>
      </p>
      <p>
        <span>Model:</span> <span>{carDetails?.model}</span>
      </p>
      <p>
        <span>Fuel Type:</span> <span>{carDetails?.fuelType}</span>
      </p>
      <p>
        <span>Color:</span> <span>{carDetails?.color}</span>
      </p>
      <p>
        <span>Year:</span> <span>{carDetails?.year}</span>
      </p>
      {carDetails?.km && (
        <p>
          <span>K"M:</span> <span>{carDetails?.km}</span>
        </p>
      )}
      {carDetails?.hand && (
        <p>
          <span>Number of Hands:</span> <span>{carDetails?.hand}</span>
        </p>
      )}
      {carDetails?.desc && (
        <p>
          <span>Description:</span> <span>{carDetails?.desc}</span>
        </p>
      )}
      {carDetails?.img1 && (
        <p>
          <span>Images:</span>
        </p>
      )}
      {carDetails?.img1 && (
        <img src={carDetails.img1} alt="first car picture" />
      )}
      {carDetails?.img2 && (
        <img src={carDetails.img2} alt="second car picture" />
      )}
      {carDetails?.img3 && (
        <img src={carDetails.img3} alt="third car picture" />
      )}
    </div>
  );
}

export default CarDetails;
