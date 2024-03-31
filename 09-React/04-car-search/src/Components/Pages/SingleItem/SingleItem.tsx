import { Car } from "../../Model/Car";
import "./SingleItem.css";

type SingleItemProp = {
    item: Car;
}

function SingleItem({ item }: SingleItemProp): JSX.Element {
    return (
        <div className="SingleItem Card">
            {item.mispar_rechev && `License Plate: ${item.mispar_rechev}`}<br />
            {item.tozeret_nm && `Manufacturer: ${item.tozeret_nm}`}<br />
            {item.kinuy_mishari && `Name: ${item.kinuy_mishari}`}<br />
            {item.baalut && `Ownership: ${item.baalut}`}<br />
            {item.sug_delek_nm && `Fuel Type: ${item.sug_delek_nm}`}
        </div>
    );
}

export default SingleItem;
