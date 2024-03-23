import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Page404 from "./Page404/Page404";
import SearchPage from "./SearchPage/SearchPage";

function MainRoutes(): JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:vehicleType" element={<SearchPage />} />
            <Route path="*" element={<Page404 />} />
        </Routes>
    );
}

export default MainRoutes;
