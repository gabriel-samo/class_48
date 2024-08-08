import moment from "moment";
import { Query } from "../DAL/dal_mysql";
import { VacationModel } from "../models/vacation";
import { NextFunction, Request, Response } from "express";

// Get vacation by id
export const getVacationById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get vacation id from request params
    const { id } = req.params;
    // Query database for vacation with the given id
    const vacation = await Query(
      `SELECT * FROM vacations 
      WHERE vacation_id = ?`,
      [id]
    );
    // Return vacation details
    return res.status(200).json(vacation);
  } catch (error: any) {
    // Log error and return 500 status with error message
    console.log(error);
    return res.status(500).json(error.message);
  }
};

// Get all vacations
export const getAllVacations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get offset from request query
    const { offset } = req.query;
    // Initialize an empty array to store vacations
    let vacations: VacationModel[] = [];
    if (offset) {
      // If offset is provided, query the database for vacations with the given offset
      vacations = await Query(
        `SELECT * FROM vacations 
        ORDER BY start_date ASC 
        LIMIT 9 OFFSET ?`,
        [+offset]
      );
    } else {
      // If offset is not provided, query the database for all vacations
      vacations = await Query(
        `SELECT * FROM vacations 
        ORDER BY start_date ASC 
        LIMIT 9`
      );
    }
    // Query the database for the total number of vacations
    const totalRows = await Query(
      `SELECT COUNT(*) AS totalRows 
      FROM vacations`
    );
    // Return the vacations and the total number of vacations
    return res
      .status(200)
      .json({ vacations, totalRows: totalRows[0]["totalRows"] });
  } catch (error: any) {
    // Log error and return 500 status with error message
    console.log(error);
    return res.status(500).json(error.message);
  }
};

// Get followed vacations
export const getFollowedVacations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get user id from request
    const userId = req.currentUser?.id;
    // Check if user id is provided
    if (!userId) {
      // Return error if user id is missing
      return res.status(400).json("Missing userId");
    }
    // Get offset from request query
    const { offset } = req.query;
    // Initialize an empty array to store vacations
    let vacations: VacationModel[] = [];
    if (offset) {
      // If offset is provided, query the database for vacations with the given offset
      vacations = await Query(
        `SELECT v.* 
        FROM follows AS f 
        JOIN vacations AS v 
        ON f.vacation_id = v.vacation_id 
        WHERE f.user_id = ? 
        ORDER BY v.start_date ASC 
        LIMIT 9 OFFSET ?`,
        [userId, +offset]
      );
    } else {
      // If offset is not provided, query the database for all vacations
      vacations = await Query(
        `SELECT v.* 
        FROM follows AS f 
        JOIN vacations AS v 
        ON f.vacation_id = v.vacation_id 
        WHERE f.user_id = ? 
        ORDER BY v.start_date ASC 
        LIMIT 9`,
        [userId]
      );
    }
    // Query the database for the total number of followed vacations
    const totalRows = await Query(
      `SELECT COUNT(*) AS totalRows 
      FROM follows 
      WHERE user_id = ?`,
      [userId]
    );
    // Return the followed vacations and the total number of followed vacations
    return res
      .status(200)
      .json({ vacations, totalRows: totalRows[0]["totalRows"] });
  } catch (error: any) {
    // Log error and return 500 status with error message
    console.log(error);
    return res.status(500).json(error.message);
  }
};

// Get not started vacations
export const getNotStartedVacations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get offset from request query
    const { offset } = req.query;
    // Initialize an empty array to store vacations
    let vacations: VacationModel[] = [];
    if (offset) {
      // If offset is provided, query the database for vacations with the given offset
      vacations = await Query(
        `SELECT * FROM vacations 
        WHERE start_date > ? 
        ORDER BY start_date ASC 
        LIMIT 9 
        OFFSET ?`,
        [moment().format("YYYY-MM-DD"), +offset]
      );
    } else {
      // If offset is not provided, query the database for all vacations
      vacations = await Query(
        `SELECT * FROM vacations 
        WHERE start_date > ? 
        ORDER BY start_date ASC 
        LIMIT 9`,
        [moment().format("YYYY-MM-DD")]
      );
    }
    // Query the database for the total number of not started vacations
    const totalRows = await Query(
      `SELECT COUNT(*) AS totalRows 
      FROM vacations 
      WHERE start_date > ?`,
      [moment().format("YYYY-MM-DD")]
    );
    // Return the not started vacations and the total number of not started vacations
    return res
      .status(200)
      .json({ vacations, totalRows: totalRows[0]["totalRows"] });
  } catch (error: any) {
    // Log error and return 500 status with error message
    console.log(error);
    return res.status(500).json(error.message);
  }
};

// Get active vacations
export const getActiveVacations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get offset from request query
    const { offset } = req.query;
    // Initialize an empty array to store vacations
    let vacations: VacationModel[] = [];
    if (offset) {
      // If offset is provided, query the database for vacations with the given offset
      vacations = await Query(
        `SELECT * FROM vacations 
        WHERE start_date <= ? AND end_date >= ? 
        ORDER BY start_date ASC 
        LIMIT 9 
        OFFSET ?`,
        [moment().format("YYYY-MM-DD"), moment().format("YYYY-MM-DD"), +offset]
      );
    } else {
      // If offset is not provided, query the database for all vacations
      vacations = await Query(
        `SELECT * FROM vacations 
        WHERE start_date <= ? AND end_date >= ? 
        ORDER BY start_date ASC 
        LIMIT 9`,
        [moment().format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")]
      );
    }
    // Query the database for the total number of active vacations
    const totalRows = await Query(
      `SELECT COUNT(*) AS totalRows 
      FROM vacations 
      WHERE start_date <= ? AND end_date >= ?`,
      [moment().format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")]
    );
    // Return the active vacations and the total number of active vacations
    return res
      .status(200)
      .json({ vacations, totalRows: totalRows[0]["totalRows"] });
  } catch (error: any) {
    // Log error and return 500 status with error message
    console.log(error);
    return res.status(500).json(error.message);
  }
};

// Add vacation
export const addVacation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get isAdmin from request
    const isAdmin = req.currentUser?.isAdmin;
    // Check if isAdmin is provided
    if (!isAdmin) {
      return res
        .status(403)
        .json("Unauthorized, only admins can add vacations");
    }
    // Get vacation details from request body
    const { destination, description, image, startDate, endDate, price } =
      req.body;
    // Check if all required fields are provided
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
    // Create vacation object
    const vacation = {
      destination,
      description,
      image,
      start_date: startDate,
      end_date: endDate,
      price
    };
    // Insert vacation into database
    const result = await Query(
      `INSERT INTO vacations 
      SET ?`,
      vacation
    );
    // Check if vacation was added successfully
    if (result.affectedRows === 0) {
      // Return error if vacation was not added
      return res.status(400).json("Failed to add vacation");
    } else {
      // Return my sql result
      return res.status(200).json(result);
    }
  } catch (error: any) {
    // Log error and return 500 status with error message
    console.log(error);
    return res.status(500).json(error.message);
  }
};

// Update vacation
export const updateVacation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get isAdmin from request
    const isAdmin = req.currentUser?.isAdmin;
    // Check if isAdmin is provided
    if (!isAdmin) {
      // Return error if isAdmin is missing
      return res
        .status(403)
        .json("Unauthorized, only admins can update vacations");
    }
    // Get vacation id from request params
    const { id } = req.params;
    // Get vacation details from request body
    const { destination, description, image, startDate, endDate, price } =
      req.body;
    // Check if all required fields are provided
    if (
      !destination ||
      !description ||
      !image ||
      !startDate ||
      !endDate ||
      !price
    ) {
      // Return error if required fields are missing
      return res.status(400).json("Missing required fields");
    }
    // Create vacation object
    const vacation = {
      destination,
      description,
      image,
      start_date: startDate,
      end_date: endDate,
      price
    };
    // Update vacation in database
    const result = await Query(
      `UPDATE vacations SET ? 
      WHERE vacation_id = ?`,
      [vacation, id]
    );
    // Check if vacation was updated successfully
    if (result.affectedRows === 0) {
      // Return error if vacation was not updated
      return res.status(400).json("Failed to update vacation");
    } else {
      // Return my sql result
      return res.status(200).json(result);
    }
  } catch (error: any) {
    // Log error and return 500 status with error message
    console.log(error);
    return res.status(500).json(error.message);
  }
};

// Delete vacation
export const deleteVacation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get isAdmin from request
    const { id } = req.params;
    // Check if vacation id is provided
    if (!id) {
      // Return error if vacation id is missing
      return res.status(400).json("Missing vacation id");
    }
    // Get isAdmin from request
    const isAdmin = req.currentUser?.isAdmin;
    // Check if isAdmin is provided
    if (!isAdmin) {
      // Return error if isAdmin is missing
      return res
        .status(403)
        .json("Unauthorized, only admins can delete vacations");
    }
    // Delete vacation from database
    const result = await Query("DELETE FROM vacations WHERE vacation_id = ?", [
      id
    ]);
    // Check if vacation was deleted successfully
    if (result.affectedRows === 0) {
      // Return error if vacation was not deleted
      return res.status(400).json("Failed to delete vacation");
    } else {
      // Return my sql result
      return res.status(200).json(result);
    }
  } catch (error: any) {
    // Log error and return 500 status with error message
    console.log(error);
    return res.status(500).json(error.message);
  }
};

// Get reports
export const getReports = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get isAdmin from request
    const isAdmin = req.currentUser?.isAdmin;
    // Check if isAdmin is provided
    if (!isAdmin) {
      // Return error if isAdmin is missing
      return res.status(403).json("Unauthorized, only admins can get reports");
    }
    // Query the database for the reports
    /* 
    This query does the following:
    - It selects the destination from the vacations table and counts the number of followers for each destination.
    - It uses a LEFT JOIN to include all destinations, even those without followers.
    - The COUNT function is used to count the number of followers, which is aliased as followers.
    - The results are grouped by destination, so we get one row per unique destination.
    - The result will show each destination and the number of followers it has, including destinations with zero followers.
    */
    const reports = await Query(
      `SELECT v.destination, COUNT(f.vacation_id) AS followers 
      FROM vacations AS v 
      LEFT JOIN follows AS f ON v.vacation_id = f.vacation_id
      GROUP BY v.destination`
    );
    // Return the reports
    return res.status(200).json(reports);
  } catch (error: any) {
    // Log error and return 500 status with error message
    console.log(error);
    return res.status(500).json(error.message);
  }
};
