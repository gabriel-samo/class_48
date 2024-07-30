import { Router } from "express";
import {
  addSong,
  deleteSong,
  getAllSong,
  getSongById,
  updateSong
} from "../logic/songLogic";

const songRouter = Router();

songRouter.get("/", getAllSong);
songRouter.get("/category/:catName", getAllSong);
songRouter.get("/:id", getSongById);
songRouter.post("/add", addSong);
songRouter.put("/update/:id", updateSong);
songRouter.delete("/delete/:id", deleteSong);

export default songRouter;
