import { NextFunction, Request, Response } from "express";
import { Query } from "../DAL/dal_mysql";

// Get followers of a specific vacation
export const getFollows = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get vacation id from request params
    const vacationId = req.params.vacationId;
    // Check if vacation id is missing
    if (!vacationId) {
      // Return error if vacation id is missing
      return res.status(400).json("Missing vacation id");
    } else {
      // Query database for followers of the given vacation id
      const follows = await Query(
        "SELECT user_id FROM follows WHERE vacation_id = ?",
        [vacationId]
      );
      // Extract user ids from the followers
      const followersIds = follows.map((follow: any) => follow.user_id);
      // Return followers ids as an array of numbers
      return res.status(200).json(followersIds);
    }
  } catch (error: any) {
    // Log error and return 500 status with error message
    console.log(error);
    return res.status(500).json(error.message);
  }
};

// Add a follow to a specific vacation
export const addFollow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get vacation id from request body
    const { vacationId } = req.body;
    // Get user id from request
    const userId = req.currentUser?.id;
    // Check if user id or vacation id is missing
    if (!userId || !vacationId) {
      // Return error if user id or vacation id is missing
      return res.status(400).json("Missing user id or vacation id");
    } else {
      // Query database for follow with the given user id and vacation id
      const foundFollow = await Query(
        "SELECT * FROM follows WHERE user_id = ? AND vacation_id = ?",
        [userId, vacationId]
      );
      // Check if follow already exists
      if (foundFollow.length > 0) {
        // Delete the follow if it exists
        const deletedFollow = await Query(
          "DELETE FROM follows WHERE user_id = ? AND vacation_id = ?",
          [userId, vacationId]
        );
        // Return mySql result
        return res.status(200).json(deletedFollow);
      } else {
        // Create follow object
        const followToAdd = { user_id: userId, vacation_id: vacationId };
        // Query database to add the follow
        const addedFollow = await Query(
          "INSERT INTO follows SET ?",
          followToAdd
        );
        // Return mySql result
        return res.status(200).json(addedFollow);
      }
    }
  } catch (error: any) {
    // Log error and return 500 status with error message
    console.log(error);
    return res.status(500).json(error.message);
  }
};
