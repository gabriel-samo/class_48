import fs from "fs/promises";
import { config } from "../config";
import { NextFunction, Request, Response } from "express";
import moment from "moment";

export const getImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { countryName } = req.params;
    if (countryName !== "null") {
      countryName = countryName.toLowerCase();
      countryName = countryName.includes(".jpg")
        ? countryName
        : `${countryName}.jpg`;
      const image = await fs.readFile(`assets/${countryName}`);
      return res.setHeader("Content-Type", "image/jpg").send(image);
    } else {
      return res.json("no such image");
    }
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

export const uploadImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({
      imageUrl: `http://${config.app.host}:${config.app.port}/api/images/${req.params.fileName}`
    });
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};
