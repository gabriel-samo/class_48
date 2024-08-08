import fs from "fs/promises";
import { config } from "../config";
import { NextFunction, Request, Response } from "express";

// Get image by file name
export const getImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get file name from request params
    let { fileName } = req.params;
    // Check if file name is not null or undefined
    if (fileName !== "null" && fileName !== "undefined") {
      // Convert file name to lowercase and add .jpg extension if it doesn't have one
      fileName = fileName.toLowerCase();
      fileName = fileName.includes(".jpg") ? fileName : `${fileName}.jpg`;
      // Read the image file from the assets folder
      const image = await fs.readFile(`assets/${fileName}`);
      // Return the image file with the appropriate content type
      return res.setHeader("Content-Type", "image/jpg").send(image);
    } else {
      // Return error if file name is null or undefined
      return res.json("no such image");
    }
  } catch (error: any) {
    // Log error and return 500 status with error message
    console.log(error);
    return res.status(500).json(error.message);
  }
};

// Upload image
export const uploadImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Return the image URL
    return res.status(200).json({
      imageUrl: `http://${config.app.host}:${config.app.port}/api/images/${req.params.fileName}`
    });
  } catch (error: any) {
    // Log error and return 500 status with error message
    console.log(error);
    return res.status(500).json(error.message);
  }
};
