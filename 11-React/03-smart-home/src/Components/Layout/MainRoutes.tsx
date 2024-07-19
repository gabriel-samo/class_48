import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import GetData from "../Pages/GetData/GetData";
import SaveData from "../Pages/SaveData/SaveData";
import SendToController from "../Pages/SendToController/SendToController";
import ShowDevices from "../Pages/ShowDevices/ShowDevices";

function MainRoutes(): JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/get-from-server" element={<GetData />} />
            <Route path="/show-devices" element={<ShowDevices />} />
            <Route path="/save-data" element={<SaveData />} />
            <Route path="/send-to-controller" element={<SendToController />} />
        </Routes>
    );
}

export default MainRoutes;
