import { NavLink } from "react-router-dom";
import "./MainMenu.css";
import { youtube } from "../../../redux/store";
import { useEffect, useState } from "react";
import { downloadCatAction } from "../../../redux/CatReducer";

function MainMenu(): JSX.Element {
    const [catList, setCatList] = useState(youtube.getState().categories.allCat);

    useEffect(() => {
        if (youtube.getState().categories.allCat.length < 1) {
            let myCategories = JSON.parse(localStorage.getItem("cat") || "[]");
            if (myCategories.length > 0) {
                youtube.dispatch(downloadCatAction(myCategories));
            }
        }
    }, [])

    youtube.subscribe(() => {
        setCatList(youtube.getState().categories.allCat)
    });

    return (
        <div className="MainMenu">
            <h2>Main Menu</h2><hr />
            <NavLink to="/">Song list</NavLink>
            <NavLink to="/addSong">Add new song</NavLink>
            <NavLink to="/newCat">Add new Category</NavLink>
            <NavLink to="/about">About me</NavLink><hr />
            {catList.map((item, index) =>
                <NavLink to={`/cat/${item}`} key={index}>{item}</NavLink>
            )}
        </div>
    );
}

export default MainMenu;
