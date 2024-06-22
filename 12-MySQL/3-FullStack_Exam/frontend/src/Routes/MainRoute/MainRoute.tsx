import Page404 from "../../Components/pages/Page404/Page404";
import { Route, Routes } from "react-router-dom";
import { Home } from "../../Components/pages/Home/Home";
import { AddMeeting } from "../../Components/pages/AddMeeting/AddMeeting";

function MainRoute(): JSX.Element {
  return (
    <div className="MainRoute">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addMeeting" element={<AddMeeting />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default MainRoute;
