import { Car } from "../../Model/Car";
import "./SingleItem.css";

type SingleItemProp = {
    item: Car;
}

function SingleItem({ item }: SingleItemProp): JSX.Element {
    return (
        <div className="SingleItem Card">
            License Plate: {item.mispar_rechev}<br />
            Manufacturer: {item.tozeret_nm}<br />
            Name: {item.kinuy_mishari}<br />
            Ownership: {item.baalut}<br />
            Fuel Type: {item.sug_delek_nm}
        </div>
    );
}

export default SingleItem;
