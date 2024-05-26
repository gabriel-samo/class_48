import { NavLink } from "react-router-dom";
import "./MainMenu.css";
import { useAppSelector } from "../../../store/hooks";

function MainMenu(): JSX.Element {
  const loggedUser = useAppSelector((state) => state.user.loggedUser);

  return (
    <div className="MainMenu">
      {loggedUser?.userToken ? (
        <>
          <h2 className="text-2xl font-bold">Main Menu</h2>
          <hr />
          <NavLink to="/" end>
            Car List
          </NavLink>
          <NavLink to="/addCar" end>
            Add New Car
          </NavLink>
        </>
      ) : (
        <div className="text-2xl">
          <br />
          Please Login
        </div>
      )}
    </div>
  );
}

export default MainMenu;
