import { Book } from "../models/book";
import { execute } from "./../DAL/dal_mysql";
import { Request, Response, NextFunction } from "express";

export const getAuthors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sql = "SELECT * FROM authors";
    const result = await execute(sql);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json("Error: " + error.message);
  }
};

export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sql = `SELECT b.id, a.firstName, a.lastName ,b.bookName, b.pagesNumber, b.bookPrice 
      FROM books AS b 
      JOIN authors AS a 
      ON b.authorId = a.id`;
    const result = await execute(sql);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json("Error: " + error.message);
  }
};

export const addBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newBook = new Book(
      req.body.authorId,
      req.body.bookName,
      req.body.pagesNumber,
      req.body.bookPrice
    );

    const sql = "INSERT INTO books SET ?";

    const result = await execute(sql, newBook);
    return res.status(200).json("Book has been added!");
  } catch (error: any) {
    return res.status(500).json("Error: " + error.message);
  }
};

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sql = "DELETE FROM books WHERE id = ?";
    const result = await execute(sql, [+req.params.bookId]);
    if (result.affectedRows > 0) {
      return res.status(200).json("Book has been deleted");
    } else {
      return res.status(400).json("Invalid book ID, no Book was deleted...");
    }
  } catch (error: any) {
    return res.status(500).json("Error: " + error.message);
  }
};
