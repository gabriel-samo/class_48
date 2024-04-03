import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
import "./CarList.css";

function CarList(): JSX.Element {
    const carList = useAppSelector(state => state.cars.cars);
    return (
        <div className="CarList">
			<h1>Car List</h1>
            {carList.map(car=>(
                <div key={car.mispar_rechev} className="Box">
                    <h2>{car.mispar_rechev}</h2>
                    <hr />
                    <p>{car.tozeret_nm}</p>
                    <p>{car.kinuy_mishari}</p>
                    <p>{car.shnat_yitzur}</p>
                    {car.km && <p>{car.km}</p>}
                    <NavLink to={`/carDetail/${car.mispar_rechev}`}>More Details</NavLink>
                </div>
            ))}
        </div>
    );
}

export default CarList;
