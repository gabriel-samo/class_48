import { Router } from "express";
import { upload } from "./../utils/uploadImage";
import { getImage, uploadImage } from "../logic/images.logic";

const imagesRouter = Router();

imagesRouter.get("/:countryName", getImage);
imagesRouter.post("/upload/:countryName", upload.single("image"), uploadImage);

export default imagesRouter;
