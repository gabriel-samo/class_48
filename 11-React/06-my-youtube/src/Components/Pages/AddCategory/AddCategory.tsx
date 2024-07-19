import { useState } from "react";
import { useAppDispatch } from "../../../store/hooks";
import "./AddCategory.css";
import { useNavigate } from "react-router-dom";
import { addCategory } from "../../../store/categorySlice";

function AddCategory(): JSX.Element {
    const dispatch = useAppDispatch();

    const [catName, setName] = useState("");
    const navigate = useNavigate();

    return (
        <div className="AddCategory">
            <div className="Box">
                <h2>Add New Category</h2>
                <hr />
                <input type="text" placeholder="Category name..." onKeyUp={(args) => {
                    setName(args.currentTarget.value);
                }} />
                <br />
                <input type="button" value="add Category" onClick={() => {
                    //redux handler
                    dispatch(addCategory(catName));
                    //move to main page
                    navigate("/");
                }} />
            </div>
        </div>
    );
}

export default AddCategory;
