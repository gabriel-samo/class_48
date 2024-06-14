import { NavLink } from "react-router-dom";
import "./MainMenu.css";

function MainMenu(): JSX.Element {
  return (
    <div className="MainMenu">
      <h2>Main Menu</h2>
      <hr />
      <NavLink to="/" end>
        Book List
      </NavLink>
      <NavLink to="/addBook" end>
        Add New Book
      </NavLink>
    </div>
  );
}

export default MainMenu;
