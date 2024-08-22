import axios from "axios";
import { Request, Response } from "express";

export const getCars = async (req: Request, res: Response) => {
  try {
    const { carNumber, limit } = req.query;
    const carUrl = `https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&limit=${
      limit ? limit : "10"
    }&q=${carNumber ? carNumber : ""}`;
    const response = await axios.get(carUrl);
    const cars = response.data.result.records;
    res.status(200).json(cars);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
