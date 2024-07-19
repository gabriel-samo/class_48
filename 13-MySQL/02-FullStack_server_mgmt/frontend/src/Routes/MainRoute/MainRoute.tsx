import Page404 from "../../Components/pages/Page404/Page404";
import { Route, Routes } from "react-router-dom";
import { ServerList } from "../../Components/pages/ServerList/ServerList";
import { ServerCard } from "../../Components/pages/ServerCard/ServerCard";

function MainRoute(): JSX.Element {
  return (
    <div className="MainRoute">
      <Routes>
        <Route path="/" element={<ServerList />} />
        <Route path="*" element={<Page404 />} />
        <Route path="/server/:id" element={<ServerCard />} />
      </Routes>
    </div>
  );
}

export default MainRoute;
