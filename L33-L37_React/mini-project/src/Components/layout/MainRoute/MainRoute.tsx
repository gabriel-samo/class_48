import { Route, Routes } from "react-router-dom";
import Home from "../../Pages/Home/Home";
import Rates from "../../Pages/Rates/Rates";
import Page404 from "../../Pages/Page404/Page404";
import Assets from "../../Pages/Assets/Assets";
import Exchanges from "../../Pages/Exchanges/Exchanges";
import Markets from "../../Pages/Markets/Markets";
import SingleRate from "../../Pages/Rates/SingleRate";
import SingleAsset from "../../Pages/Assets/SingleAsset";
import SingleAssetHistory from "../../Pages/Assets/SingleAssetHistory";
import SingleAssetMarkets from "../../Pages/Assets/SingleAssetHistory";
import SingleExchanges from "../../Pages/Exchanges/SingleExchange";
import LoginForm from "../LoginForm/LoginForm";

function MainRoute(): JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/rates" element={<Rates />} />
            <Route path="/rates/:id" element={<SingleRate />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/assets/:id" element={<SingleAsset />} />
            <Route path="/assets/:id/history" element={<SingleAssetHistory />} />
            <Route path="/assets/:id/markets" element={<SingleAssetMarkets />} />
            <Route path="/exchanges" element={<Exchanges />} />
            <Route path="/exchanges/:id" element={<SingleExchanges />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="*" element={<Page404 />} />
        </Routes>
    );
}

export default MainRoute;
