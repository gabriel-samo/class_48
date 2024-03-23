import { NavLink } from "react-router-dom";
import "./MainMenu.css";

function MainMenu(): JSX.Element {
    return (
        <div className="MainMenu">
            <h3>Main Menu</h3><hr />
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/search/car'>Car Search</NavLink>
            <NavLink to='/search/bike'>Bike Search</NavLink>
            <NavLink to='/search/truck'>Truck Search</NavLink>
            <NavLink to='/search/offroad'>OffRoad Vehicle Search</NavLink>
        </div>
    );
}

export default MainMenu;
