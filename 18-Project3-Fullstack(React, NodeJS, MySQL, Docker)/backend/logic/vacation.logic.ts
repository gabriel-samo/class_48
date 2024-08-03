import { NextFunction, Request, Response } from "express";
import { Query } from "../DAL/dal_mysql";
import { VacationModel } from "../models/vacation";
import moment from "moment";

export const getAllVacations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { offset } = req.query;
    let vacations: VacationModel[] = [];

    if (offset) {
      vacations = await Query(
        "SELECT * FROM vacations ORDER BY start_date ASC LIMIT 9 OFFSET ?",
        [+offset]
      );
    } else {
      vacations = await Query(
        "SELECT * FROM vacations ORDER BY start_date ASC LIMIT 9"
      );
    }
    const totalRows = await Query(
      "SELECT COUNT(*) AS totalRows FROM vacations"
    );
    return res
      .status(200)
      .json({ vacations, totalRows: totalRows[0]["totalRows"] });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

export const getFollowedVacations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.currentUser?.id;
    const { offset } = req.query;
    if (!userId) {
      return res.status(400).json("Missing userId");
    } else {
      let vacations: VacationModel[] = [];
      if (offset) {
        vacations = await Query(
          "SELECT v.* FROM follows AS f JOIN vacations AS v ON f.vacation_id = v.vacation_id WHERE f.user_id = ? ORDER BY v.start_date ASC LIMIT 9 OFFSET ?",
          [userId, +offset]
        );
      } else {
        vacations = await Query(
          "SELECT v.* FROM follows AS f JOIN vacations AS v ON f.vacation_id = v.vacation_id WHERE f.user_id = ? ORDER BY v.start_date ASC LIMIT 9",
          [userId]
        );
      }
      const totalRows = await Query(
        "SELECT COUNT(*) AS totalRows FROM follows WHERE user_id = ?",
        [userId]
      );
      return res
        .status(200)
        .json({ vacations, totalRows: totalRows[0]["totalRows"] });
    }
  } catch (error: any) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

export const getNotStartedVacations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { offset } = req.query;
    let vacations: VacationModel[] = [];
    if (offset) {
      vacations = await Query(
        "SELECT * FROM vacations WHERE start_date > ? ORDER BY start_date ASC LIMIT 9 OFFSET ?",
        [moment().format("YYYY-MM-DD"), +offset]
      );
    } else {
      vacations = await Query(
        "SELECT * FROM vacations WHERE start_date > ? ORDER BY start_date ASC LIMIT 9",
        [moment().format("YYYY-MM-DD")]
      );
    }
    const totalRows = await Query(
      "SELECT COUNT(*) AS totalRows FROM vacations WHERE start_date > ?",
      [moment().format("YYYY-MM-DD")]
    );
    return res
      .status(200)
      .json({ vacations, totalRows: totalRows[0]["totalRows"] });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

export const getActiveVacations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { offset } = req.query;
    let vacations: VacationModel[] = [];
    if (offset) {
      vacations = await Query(
        "SELECT * FROM vacations WHERE start_date <= ? AND end_date >= ? ORDER BY start_date ASC LIMIT 9 OFFSET ?",
        [moment().format("YYYY-MM-DD"), moment().format("YYYY-MM-DD"), +offset]
      );
    } else {
      vacations = await Query(
        "SELECT * FROM vacations WHERE start_date <= ? AND end_date >= ? ORDER BY start_date ASC LIMIT 9",
        [moment().format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")]
      );
    }
    const totalRows = await Query(
      "SELECT COUNT(*) AS totalRows FROM vacations WHERE start_date <= ? AND end_date >= ?",
      [moment().format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")]
    );
    return res
      .status(200)
      .json({ vacations, totalRows: totalRows[0]["totalRows"] });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};
