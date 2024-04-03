import { useParams } from "react-router-dom";
import "./CarDetails.css";
import { useAppSelector } from "../../../store/hooks";

function CarDetails(): JSX.Element {
    const params = useParams();
    const carDetails = useAppSelector(state => state.cars.cars.find(car => car.mispar_rechev === parseInt(params.carNumber!)));

    return (
        <div className="CarDetails Box">
			<h2>Car Number: {carDetails?.mispar_rechev}</h2>
            <p>Manufacturer: {carDetails?.tozeret_nm}</p>
            <p>Model: {carDetails?.kinuy_mishari}</p>
            <p>Fuel Type: {carDetails?.sug_delek_nm}</p>
            <p>Color: {carDetails?.tzeva_rechev}</p>
            <p>Year: {carDetails?.shnat_yitzur}</p>
            {carDetails?.km && <p>K"M: {carDetails?.km}</p>}
            {carDetails?.hand && <p>Number of Hands: {carDetails?.hand}</p>}
            {carDetails?.desc && <p>Description: {carDetails?.desc}</p>}
            {carDetails?.img1 && <p>Images:</p>}
            {carDetails?.img1 && <img src={carDetails.img1} alt="car picture" />}
            {carDetails?.img2 && <img src={carDetails.img2} alt="car picture" />}
            {carDetails?.img3 && <img src={carDetails.img3} alt="car picture" />}
        </div>
    );
}

export default CarDetails;
