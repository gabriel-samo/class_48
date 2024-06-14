import "./BookList.css";
import axios from "axios";
import DeletePrompt from "../../DeletePrompt";
import { useState, useEffect } from "react";
import { Book } from "../../../model/book";

function BookList(): JSX.Element {
  const [deleteIsVisible, setDeleteIsVisible] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<number>();
  const [bookList, setBookList] = useState<Book[] | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:5050/api/books/all/")
      .then((res) => {
        setBookList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleOpenDeletePrompt(bookId: number) {
    setBookToDelete(bookId);
    setDeleteIsVisible(true);
  }

  function handleCloseDeletePrompt() {
    setDeleteIsVisible(false);
  }

  function handleBookDelete(bookId: number) {
    axios
      .delete("http://localhost:5050/api/books/delete/" + bookId)
      .then((res) => {
        console.log(res.data);
        return axios.get("http://localhost:5050/api/books/all/");
      })
      .then((res) => {
        setBookList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="BookList">
      <h1>Book List</h1>
      {bookList &&
        bookList.map((book) => (
          <div key={book.id} className="Box">
            {deleteIsVisible && (
              <DeletePrompt
                onClose={handleCloseDeletePrompt}
                onBookDelete={handleBookDelete}
                bookId={bookToDelete!}
              />
            )}
            <div className="cardTitle">
              <h2>{book.bookName}</h2>
              <input
                type="button"
                value="Delete"
                onClick={() => handleOpenDeletePrompt(book.id!)}
              />
            </div>
            <hr />
            <p>
              <span>Book Name:</span> {book.bookName}
            </p>
            <p>
              <span>Author:</span> {book.firstName + book.lastName}
            </p>
            <p>
              <span>Pages:</span> {book.pagesNumber}
            </p>
            <p>
              <span>Price</span> ${+book.bookPrice}
            </p>
          </div>
        ))}
    </div>
  );
}

export default BookList;
