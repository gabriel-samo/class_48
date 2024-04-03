import { useParams } from "react-router-dom";
import "./CarDetails.css";
import { useAppSelector } from "../../../store/hooks";

function CarDetails(): JSX.Element {
  const params = useParams();
  const carDetails = useAppSelector((state) =>
    state.cars.cars.find(
      (car) => car.mispar_rechev === parseInt(params.carNumber!)
    )
  );

  return (
    <div className="CarDetails Box">
      <h2>
        <span>Car Number:</span> <span>{carDetails?.mispar_rechev}</span>
      </h2>
      <p>
        <span>Manufacturer:</span> <span>{carDetails?.tozeret_nm}</span>
      </p>
      <p>
        <span>Model:</span> <span>{carDetails?.kinuy_mishari}</span>
      </p>
      <p>
        <span>Fuel Type:</span> <span>{carDetails?.sug_delek_nm}</span>
      </p>
      <p>
        <span>Color:</span> <span>{carDetails?.tzeva_rechev}</span>
      </p>
      <p>
        <span>Year:</span> <span>{carDetails?.shnat_yitzur}</span>
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
