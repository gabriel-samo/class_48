import "./AddCategory.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import { addCategory } from "../../../store/categorySlice";

function AddCategory(): JSX.Element {
  const dispatch = useAppDispatch();

  const [newCategory, setNewCategory] = useState("");
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const res = await axios.post("http://localhost:3030/api/categories/add", {
        name: newCategory
      });
      if (res.status === 200) {
        dispatch(addCategory(res.data));
        navigate("/");
      } else {
        console.log(res.data);
      }
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="AddCategory">
      <div className="Box">
        <h2>Add New Category</h2>
        <hr />
        <input
          type="text"
          placeholder="Category name..."
          onKeyUp={(args) => {
            setNewCategory(args.currentTarget.value);
          }}
        />
        <br />
        <input type="button" value="add Category" onClick={handleClick} />
      </div>
    </div>
  );
}

export default AddCategory;
