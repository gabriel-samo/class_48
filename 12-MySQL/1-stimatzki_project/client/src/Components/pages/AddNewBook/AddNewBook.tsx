import "./AddNewBook.css";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Book = {
  authorId?: number | null;
  bookName?: string | null;
  pagesNumber?: number | null;
  bookPrice?: number | null;
};

type Author = {
  id: number;
  firstName: string;
  lastName: string;
};

function AddNewBook(): JSX.Element {
  const navigate = useNavigate();
  const [authors, setAuthors] = useState<Author[]>();
  const [bookDetails, setBookDetails] = useState<Book>({
    authorId: null,
    bookName: null,
    pagesNumber: null,
    bookPrice: null
  });

  useEffect(() => {
    axios
      .get("http://localhost:5050/api/books/authors/")
      .then((res) => {
        setAuthors(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setBookDetails((prevState: any) => {
      if (!prevState) return null;
      return { ...prevState, [event.target.name]: event.target.value };
    });
  }

  function handleAddBook() {
    if (bookDetails) {
      axios
        .post("http://localhost:5050/api/books/add/", bookDetails)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      navigate("/");
    }
  }

  return (
    <div className="AddNewBook">
      <div className="BookDetails">
        <h1>Add Book</h1>
        <hr />
        <form onSubmit={handleAddBook}>
          <p className="inputArea">
            <label htmlFor="bookName">Book Name: </label>
            <input
              type="text"
              name="bookName"
              id="bookName"
              placeholder="Enter book name"
              onChange={handleChange}
              required
            />
          </p>
          <p className="inputArea">
            <label htmlFor="pagesNumber">Pages Number: </label>
            <input
              type="number"
              name="pagesNumber"
              id="pagesNumber"
              placeholder="Enter Pages Number"
              required
              onChange={handleChange}
            />
          </p>
          <p className="inputArea">
            <label htmlFor="bookPrice">Book Price: </label>
            <input
              type="number"
              name="bookPrice"
              id="bookPrice"
              step="0.01"
              placeholder="Enter Book Price"
              required
              onChange={handleChange}
            />
          </p>
          <p className="inputArea">
            <label htmlFor="authorId">Author: </label>
            <select
              name="authorId"
              id="authorId"
              onChange={handleChange}
              required
            >
              <option value=""></option>
              {authors &&
                authors.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.firstName} {item.lastName}
                  </option>
                ))}
            </select>
          </p>
          <input type="submit" value="Add Book" />
        </form>
      </div>
    </div>
  );
}

export default AddNewBook;
