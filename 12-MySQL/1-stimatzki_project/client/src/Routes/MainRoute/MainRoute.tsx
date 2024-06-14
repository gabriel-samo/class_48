import { Route, Routes } from "react-router-dom";
import Page404 from "../../Components/pages/Page404/Page404";
import BookList from "../../Components/pages/BookList/BookList";
import AddNewBook from "../../Components/pages/AddNewBook/AddNewBook";

function MainRoute(): JSX.Element {
  return (
    <div className="MainRoute">
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/addBook" element={<AddNewBook />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default MainRoute;
