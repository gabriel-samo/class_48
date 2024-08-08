import { NextFunction, Request, Response } from "express";
import { Query } from "../DAL/dal_mysql";
import { VacationModel } from "../models/vacation";
import moment from "moment";

export const getVacationById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const vacation = await Query(
      "SELECT * FROM vacations WHERE vacation_id = ?",
      [id]
    );
    return res.status(200).json(vacation);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

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

export const addVacation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const isAdmin = req.currentUser?.isAdmin;
    if (!isAdmin) {
      return res
        .status(403)
        .json("Unauthorized, only admins can add vacations");
    }
    const { destination, description, image, startDate, endDate, price } =
      req.body;
    if (
      !destination ||
      !description ||
      !image ||
      !startDate ||
      !endDate ||
      !price
    ) {
      return res.status(400).json("Missing required fields");
    }
    const vacation = {
      destination,
      description,
      image,
      start_date: startDate,
      end_date: endDate,
      price
    };
    const result = await Query("INSERT INTO vacations SET ?", vacation);
    if (result.affectedRows === 0) {
      return res.status(400).json("Failed to add vacation");
    } else {
      return res.status(200).json(result);
    }
  } catch (error: any) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

export const updateVacation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const isAdmin = req.currentUser?.isAdmin;
    if (!isAdmin) {
      return res
        .status(403)
        .json("Unauthorized, only admins can update vacations");
    }
    const { id } = req.params;
    const { destination, description, image, startDate, endDate, price } =
      req.body;
    if (
      !destination ||
      !description ||
      !image ||
      !startDate ||
      !endDate ||
      !price
    ) {
      return res.status(400).json("Missing required fields");
    }
    const vacation = {
      destination,
      description,
      image,
      start_date: startDate,
      end_date: endDate,
      price
    };
    const result = await Query("UPDATE vacations SET ? WHERE vacation_id = ?", [
      vacation,
      id
    ]);
    if (result.affectedRows === 0) {
      return res.status(400).json("Failed to update vacation");
    } else {
      return res.status(200).json(result);
    }
  } catch (error: any) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

export const deleteVacation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const isAdmin = req.currentUser?.isAdmin;
    if (!isAdmin) {
      return res
        .status(403)
        .json("Unauthorized, only admins can delete vacations");
    }
    const result = await Query("DELETE FROM vacations WHERE vacation_id = ?", [
      id
    ]);
    if (result.affectedRows === 0) {
      return res.status(400).json("Failed to delete vacation");
    } else {
      return res.status(200).json(result);
    }
  } catch (error: any) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

export const getReports = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.currentUser?.isAdmin) {
      return res.status(403).json("Unauthorized, only admins can get reports");
    }
    const reports = await Query(
      `SELECT v.destination, COUNT(f.vacation_id) AS followers 
      FROM vacations AS v 
      LEFT JOIN follows AS f ON v.vacation_id = f.vacation_id
      GROUP BY v.destination`
    );
    return res.status(200).json(reports);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};
