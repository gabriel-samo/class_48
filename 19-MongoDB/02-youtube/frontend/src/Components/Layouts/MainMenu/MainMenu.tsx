import "./MainMenu.css";
import axios from "axios";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { setCategories } from "../../../store/categorySlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

function MainMenu(): JSX.Element {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categories);

  useEffect(() => {
    axios
      .get("http://localhost:3030/api/categories")
      .then((res) => {
        dispatch(setCategories(res.data));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="MainMenu">
      <h2>Main Menu</h2>
      <hr />
      <NavLink to="/">Song list</NavLink>
      <NavLink to="/addSong">Add new song</NavLink>
      <NavLink to="/newCat">Add new Category</NavLink>
      <NavLink to="/about">About me</NavLink>
      <hr />
      {categories.map((item, index) => (
        <NavLink to={`/cat/${item}`} key={index}>
          {item}
        </NavLink>
      ))}
    </div>
  );
}

export default MainMenu;
