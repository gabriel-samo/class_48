import { useEffect, useState } from "react";
import SingleCoin from "../../items/SingleCoin/SingleCoin";
import "./MainBody.css";
import { CoinRate } from "../../model/CoinRate";
import axios from "axios";

function MainBody(): JSX.Element {
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
            {coins.map((item, index) => <SingleCoin key={index} id={item.id} symbol={item.symbol} currencySymbol={item.currencySymbol}
                rateUsd={item.rateUsd} type={item.type} />)}
        </div>
    );
}

export default MainBody;
