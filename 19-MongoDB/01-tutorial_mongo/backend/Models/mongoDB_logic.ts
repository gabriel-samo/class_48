import { ICatModel } from "./catMode_mongoDB";
import { CatNotFound, ClientError, videoNotFound } from "./ClientsErrors";
// CRUD - > Create, Read, Update, Delete

import { ISongModel, SongModel } from "./SongMongoDB";

// Create (sql: INSERT INTO songs)
export const addSong = (newSong: ISongModel): Promise<ISongModel> => {
  // Before we sendong date to the mongoDB, we need to validate the data
  const errors = newSong.validateSync();
  if (errors) throw new videoNotFound(errors.message);
  return newSong.save();
};

// Create category new item
export const addCategory = (newCategory: ICatModel): Promise<ICatModel> => {
  const errors = newCategory.validateSync();
  if (errors) throw new CatNotFound(errors.message);
  return newCategory.save();
};

// READ => SELECT * FROM songs
export const getAllSongs = async (): Promise<ISongModel[]> => {
  // get all songs WITHOUT virtual fileds
  // const songs = await SongModel.find().exec();
  // get all songs WITH virtual fileds
  const songs = await SongModel.find().populate("category").exec();
  return songs;
};

// SELECT * FROM songs WHERE id = ?
export const getSongById = async (id: string): Promise<ISongModel> => {
  const song = await SongModel.findById(id).exec();
  if (!song) throw new videoNotFound("Song not found");
  return song;
};

// UPDATE => UPDATE songs SET name = ?, category = ? WHERE id = ?
export const updateSong = async (song: ISongModel): Promise<ISongModel> => {
  const errors = song.validateSync();
  if (errors) throw new videoNotFound(errors.message);
  const updatedSong = await SongModel.findByIdAndUpdate(song._id, song, {
    returnOriginal: false
  }).exec();
  if (!updatedSong) throw new videoNotFound("Song wasnt updated");
  return updatedSong;
};

// DELETE => DELETE FROM songs WHERE id = ?
export const deleteSong = async (id: string): Promise<void> => {
  const deletedSong = await SongModel.findByIdAndDelete(id).exec();
  if (!deletedSong) throw new ClientError(400, "Song wasnt deleted");
};

export const getPartialSongs = async (): Promise<ISongModel[]> => {
  const songs = await SongModel.find(
    {},
    { title: true, url: true, _id: false }
  ).exec();
  return songs;
};
