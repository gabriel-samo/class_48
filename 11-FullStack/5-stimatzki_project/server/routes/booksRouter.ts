import express from "express";
import {
  addBook,
  getAuthors,
  getAllBooks,
  deleteBook
} from "../logic/booksLogic";

const booksRouter = express.Router();

// http://localhost:5050/api/books/authors/
booksRouter.get("/books/authors/", getAuthors);
// http://localhost:5050/api/books/all/
booksRouter.get("/books/all/", getAllBooks);
// http://localhost:5050/api/books/add/
booksRouter.post("/books/add/", addBook);
// http://localhost:5050/api/books/delete/:bookId
booksRouter.delete("/books/delete/:bookId", deleteBook);

export default booksRouter;
