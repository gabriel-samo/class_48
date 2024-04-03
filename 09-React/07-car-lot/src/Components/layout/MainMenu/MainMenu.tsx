import { NavLink } from "react-router-dom";
import "./MainMenu.css";

function MainMenu(): JSX.Element {
  return (
    <div className="MainMenu">
      <h2>Main Menu</h2>
      <hr />
      <NavLink to="/" end>
        Car List
      </NavLink>
      <NavLink to="/addCar" end>
        Add New Car
      </NavLink>
    </div>
  );
}

export default MainMenu;
