import { CategoryModel } from "../Models/CategoryModel";
import { NextFunction, Request, Response } from "express";
import { ClientError } from "../Models/ClientsErrors";

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await CategoryModel.find().exec();
    if (!categories) throw new ClientError(400, "Categories not found");
    res.status(200).json(categories.map((item) => item.name));
  } catch (error: any) {
    next(error);
  }
};

export const addCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newCategory = new CategoryModel({ name: req.body.name });
    const errors = newCategory.validateSync();
    if (errors) throw new ClientError(400, errors.message);
    const category = await newCategory.save();
    res.status(200).json(category);
  } catch (error: any) {
    next(error);
  }
};

export const getCategoryByName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.params;
    const category = await CategoryModel.findOne({ name }).exec();
    if (!category) throw new ClientError(400, "Category not found");
    res.status(200).json(category);
  } catch (error: any) {
    next(error);
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.body;
    const category = await CategoryModel.findById(id).exec();
    if (!category) throw new ClientError(400, "Category not found");
    const errors = category.validateSync();
    if (errors) throw new ClientError(400, errors.message);
    const updatedCategory = await CategoryModel.findByIdAndUpdate({
      returnOriginal: false
    }).exec();
    if (!updatedCategory) throw new ClientError(400, "Category wasnt updated");
    res.status(200).json(updatedCategory);
  } catch (error: any) {
    next(error);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.params;
    const category = await CategoryModel.findOne({ name }).exec();
    if (!category) throw new ClientError(400, "Category not found");
    const deletedCategory = await category.deleteOne();
    res.status(200).json(deletedCategory);
  } catch (error: any) {
    next(error);
  }
};
