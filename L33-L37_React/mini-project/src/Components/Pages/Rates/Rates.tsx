import { useEffect, useState } from "react";
import SingleCoin from "./SingleRate";
import { CoinRate } from "../../model/CoinRate";
import axios from "axios";
import "./Rates.css";
import { Typography } from "@mui/material";

function Rates(): JSX.Element {
    const [coins, setCoins] = useState<CoinRate[]>([]);
    const COINS_URL = 'http://api.coincap.io/v2/rates';

    useEffect(() => {
        axios.get(COINS_URL)
            .then((result) => {
                setCoins(result.data.data);
            })
    }, [])

    return (
        <div className="MainBody">
            <Typography variant="h3" component={'h1'}>Rates</Typography>
            {coins.map((item, index) => <SingleCoin key={index} item={item} />)}
        </div>
    );
}

export default Rates;
