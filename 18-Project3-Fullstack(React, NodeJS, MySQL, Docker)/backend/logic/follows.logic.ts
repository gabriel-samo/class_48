import { NextFunction, Request, Response } from "express";
import { Query } from "../DAL/dal_mysql";

export const getFollows = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vacationId = req.params.vacationId;
    if (!vacationId) {
      return res.status(400).json("Missing vacationId");
    } else {
      const follows = await Query(
        "SELECT user_id FROM follows WHERE vacation_id = ?",
        [vacationId]
      );
      const followersIds = follows.map((follow: any) => follow.user_id);
      return res.status(200).json(followersIds);
    }
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

export const addFollow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { vacationId } = req.body;
    const userId = req.currentUser?.id;
    if (!userId || !vacationId) {
      return res.status(400).json("Missing userId or vacationId");
    } else {
      const foundFollow = await Query(
        "SELECT * FROM follows WHERE user_id = ? AND vacation_id = ?",
        [userId, vacationId]
      );
      if (foundFollow.length > 0) {
        const deletedFollow = await Query(
          "DELETE FROM follows WHERE user_id = ? AND vacation_id = ?",
          [userId, vacationId]
        );
        return res.status(200).json(deletedFollow);
      } else {
        const followToAdd = { user_id: userId, vacation_id: vacationId };
        const addedFollow = await Query(
          "INSERT INTO follows SET ?",
          followToAdd
        );
        return res.status(200).json(addedFollow);
      }
    }
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};
