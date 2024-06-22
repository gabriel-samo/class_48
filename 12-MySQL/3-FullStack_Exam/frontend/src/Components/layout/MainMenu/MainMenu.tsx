import { NavLink } from "react-router-dom";
import "./MainMenu.css";

function MainMenu(): JSX.Element {
  return (
    <div className="MainMenu">
      <h2>Main Menu</h2>
      <hr />
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="/addMeeting" end>
        Add Meeting
      </NavLink>
    </div>
  );
}

export default MainMenu;
