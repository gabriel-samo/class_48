import { CategoryModel } from "./CategoryModel";
import { Document, Schema, model } from "mongoose";

//model interface describing the data in the model
export interface ISongModel extends Document {
  //don't specify the _id here !!!!
  url: string;
  title: string;
  songImg: string;
  description: string;
  category: Schema.Types.ObjectId; //foreign key to Category id
}

const SongSchema = new Schema<ISongModel>(
  {
    //url,title,songImg, videoFile
    url: {
      type: String,
      required: [true, "missing url address"],
      minlength: [3, "url too short"],
      maxlength: [255, "url too long"],
      trim: true,
      unique: true
    },
    title: {
      type: String,
      required: [true, "missing title address"],
      minlength: [3, "title too short"],
      maxlength: [255, "title too long"],
      trim: true,
      unique: false
    },
    songImg: {
      type: String,
      minlength: [3, "song image too short"],
      maxlength: [255, "song image too long"],
      trim: true,
      unique: true
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: CategoryModel
    }
  },
  {
    versionKey: false, //do not create _v field for versioning...
    toJSON: { virtuals: true } //when converting db to json, allow bring virtual fields
    //id: false //do not duplicate _id into id field
  }
);

SongSchema.virtual("categoryName", {
  ref: CategoryModel, //which model are you describing
  localField: "category", //which field in our model is it
  foreignField: "_id", //which field on category model is it
  justOne: true //category is a single object and not an array
});

export const SongModel = model<ISongModel>("SongModel", SongSchema, "songs");
