import { type Request, type Response } from "express";
import { Execute } from "../DAL/dal_mysql";

export const getAllTeams = async (req: Request, res: Response) => {
  try {
    const sql = "SELECT * FROM teams";
    const result = await Execute(sql);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json("ERROR!" + error);
  }
};
