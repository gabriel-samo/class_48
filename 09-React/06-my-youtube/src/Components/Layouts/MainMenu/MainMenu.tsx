import { NavLink } from "react-router-dom";
import "./MainMenu.css";
import { useAppSelector } from "../../../store/hooks";

function MainMenu(): JSX.Element {
    const categories = useAppSelector(state => state.categories.categories)

    return (
        <div className="MainMenu">
            <h2>Main Menu</h2><hr />
            <NavLink to="/">Song list</NavLink>
            <NavLink to="/addSong">Add new song</NavLink>
            <NavLink to="/newCat">Add new Category</NavLink>
            <NavLink to="/about">About me</NavLink><hr />
            {categories.map((item, index) =>
                <NavLink to={`/cat/${item}`} key={index}>{item}</NavLink>
            )}
        </div>
    );
}

export default MainMenu;
