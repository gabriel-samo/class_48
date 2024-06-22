import { type Request, type Response } from "express";
import { Execute } from "../DAL/dal_mysql";

export const getTeamMeetings = async (req: Request, res: Response) => {
  try {
    const teamId = req.params.id;
    const sql = "SELECT * FROM meetings WHERE team_id = ?";
    const result = await Execute(sql, [teamId]);
    return res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json("ERROR!" + error);
  }
};

export const addNewMeeting = async (req: Request, res: Response) => {
  try {
    const newMeeting = { ...req.body };
    const sql = "INSERT INTO meetings SET ?";
    const result = await Execute(sql, newMeeting);
    return res
      .status(200)
      .json(`Meeting with ID: ${result.insertId} was added :)`);
  } catch (error: any) {
    res.status(500).json("ERROR!" + error);
  }
};
