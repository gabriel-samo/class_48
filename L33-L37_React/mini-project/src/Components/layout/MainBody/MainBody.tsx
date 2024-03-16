import { useEffect, useState } from "react";
import SingleCoin from "../../items/SingleCoin/SingleCoin";
import "./MainBody.css";
import { CoinRate } from "../../model/CoinRate";
import axios from "axios";
import MainRoute from "../MainRoute/MainRoute";

function MainBody(): JSX.Element {
    return (
        <MainRoute />
    );
}

export default MainBody;
