import { ClientError } from "../Models/ClientsErrors";
import { ISongModel, SongModel } from "../Models/SongModel";
import { CategoryModel, ICategoryModel } from "../Models/CategoryModel";

// CRUD => Create, Read, Update, Delete

// CREATE => (sql: INSERT INTO songs)
const addSong = (newSong: ISongModel): Promise<ISongModel> => {
  // Before we sendong date to the mongoDB, we need to validate the data
  const errors = newSong.validateSync();
  if (errors) throw new ClientError(400, errors.message);
  return newSong.save();
};

// CREATE => Create category new item
const addCategory = (newCategory: ICategoryModel): Promise<ICategoryModel> => {
  const errors = newCategory.validateSync();
  if (errors) throw new ClientError(400, errors.message);
  return newCategory.save();
};

// READ => SELECT * FROM songs
const getAllSongs = async (): Promise<ISongModel[]> => {
  // get all songs WITHOUT virtual fileds
  // const songs = await SongModel.find().exec();
  // get all songs WITH virtual fileds
  const songs = await SongModel.find().populate("category").exec();
  return songs;
};

const getAllCategories = async (): Promise<ICategoryModel[]> => {
  const categories = await CategoryModel.find().exec();
  return categories;
};

// READ => SELECT * FROM songs WHERE id = ?
const getSongById = async (id: string): Promise<ISongModel> => {
  const song = await SongModel.findById(id).exec();
  if (!song) throw new ClientError(404, "Song not found");
  return song;
};

// READ => SELECT title, url FROM songs
const getPartialSongs = async (): Promise<ISongModel[]> => {
  const songs = await SongModel.find(
    {},
    { title: true, url: true, _id: false }
  ).exec();
  return songs;
};

// UPDATE => UPDATE songs SET name = ?, category = ?, WHERE id = ?
const updateSong = async (song: ISongModel): Promise<ISongModel> => {
  const errors = song.validateSync();
  if (errors) throw new ClientError(400, errors.message);
  const updatedSong = await SongModel.findByIdAndUpdate(song._id, song, {
    returnOriginal: false
  }).exec();
  if (!updatedSong) throw new ClientError(400, "Song wasnt updated");
  return updatedSong;
};

// UPDATE => UPDATE category SET name = ? WHERE id = ?
const updateCategory = async (
  category: ICategoryModel
): Promise<ICategoryModel> => {
  const errors = category.validateSync();
  if (errors) throw new ClientError(400, errors.message);
  const updatedCategory = await CategoryModel.findByIdAndUpdate(
    category._id,
    category,
    {
      returnOriginal: false
    }
  ).exec();
  if (!updatedCategory) throw new ClientError(400, "Category wasnt updated");
  return updatedCategory;
};

// DELETE => DELETE FROM songs WHERE id = ?
const deleteSong = async (id: string): Promise<void> => {
  const deletedSong = await SongModel.findByIdAndDelete(id).exec();
  if (!deletedSong) throw new ClientError(400, "Song wasnt deleted");
};

// DELETE => DELETE FROM category WHERE id = ?
const deleteCategory = async (id: string): Promise<void> => {
  const deletedCategory = await CategoryModel.findByIdAndDelete(id).exec();
  if (!deletedCategory) throw new ClientError(400, "Category wasnt deleted");
};
