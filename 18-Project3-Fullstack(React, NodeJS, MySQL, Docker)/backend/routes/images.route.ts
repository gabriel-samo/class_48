import { Router } from "express";
import { upload } from "./../utils/uploadImage";
import { getImage, uploadImage } from "../logic/images.logic";

const imagesRouter = Router();

// Get image by file name
imagesRouter.get("/:fileName", getImage);
// Upload image
imagesRouter.post("/upload/:fileName", upload.single("image"), uploadImage);

export default imagesRouter;
