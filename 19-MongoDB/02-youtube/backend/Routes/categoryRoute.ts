import { Router } from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  getCategoryByName,
  updateCategory
} from "../logic/categoryLogic";

const categoryRouter = Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.post("/add", addCategory);
categoryRouter.put("/:id", updateCategory);
categoryRouter.get("/:name", getCategoryByName);
categoryRouter.delete("/:name", deleteCategory);

export default categoryRouter;
