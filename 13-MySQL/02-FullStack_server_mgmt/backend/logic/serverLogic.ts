import { Request, Response } from "express";
import { Execute } from "../DAL/dal_mysql";

export const allServers = async (req: Request, res: Response) => {
  try {
    let sql =
      "SELECT s.*, c.name AS companyName FROM servers AS s JOIN companies AS c WHERE c.id = s.hostingCompany ";
    if (req.query.time) sql += "ORDER BY s.createdAt DESC";
    if (req.query.status) sql += "ORDER BY s.status DESC";
    const result = await Execute(sql);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json("ERROR! " + error);
  }
};

export const setServerStatus = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const status = req.body.status;

    const sql = "UPDATE servers SET servers.status=? WHERE id=?";
    const values = [status, id];

    await Execute(sql, values);
    return res.status(200).json(`Server now ${status ? "ON" : "OFF"} :)`);
  } catch (error: any) {
    return res.status(500).json("ERROR! " + error);
  }
};
