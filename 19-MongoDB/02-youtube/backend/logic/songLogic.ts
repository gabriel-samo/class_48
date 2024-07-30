import { NextFunction, Request, Response } from "express";
import { SongModel } from "../Models/SongModel";
import { ClientError } from "../Models/ClientsErrors";

export const getAllSong = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const songs = await SongModel.find().populate("category").exec();
    return res.status(200).json(songs);
  } catch (error: any) {
    next(error);
  }
};

export const getSongById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const song = await SongModel.findById(req.params.id)
      .populate("category")
      .exec();
    if (!song) throw new ClientError(404, "Song not found");
    return res.status(200).json(song);
  } catch (error: any) {
    next(error);
  }
};

export const addSong = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const song = await SongModel.create(req.body);
    const errors = song.validateSync();
    if (errors) throw new ClientError(400, errors.message);
    return res.status(201).json(song);
  } catch (error: any) {
    next(error);
  }
};

export const updateSong = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const song = await SongModel.findById(req.params.id).exec();
    if (!song) throw new ClientError(404, "Song not found");
    const errors = song.validateSync();
    if (errors) throw new ClientError(400, errors.message);
    const updatedSong = await SongModel.findByIdAndUpdate(song._id, song, {
      returnOriginal: false
    }).exec();
    if (!updatedSong) throw new ClientError(400, "Song wasnt updated");
    return res.status(200).json(updatedSong);
  } catch (error: any) {
    next(error);
  }
};

export const deleteSong = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const song = await SongModel.findByIdAndDelete(req.params.id).exec();
    if (!song) throw new ClientError(404, "Song not found");
    return res.status(200).json(song);
  } catch (error: any) {
    next(error);
  }
};
