import { useEffect, useState } from "react";
import "./Exchanges.css";
import axios from "axios";
import SingleExchange from "./SingleExchange";
import { ExchangeModal } from "../../model/ExchangeModel";
import { Typography } from "@mui/material";

function Exchanges(): JSX.Element {
    const [exchanges, setExchanges] = useState<ExchangeModal[]>([]);
    const EXCHANGE_URL = 'https://api.coincap.io/v2/exchanges';

    useEffect(() => {
        axios.get(EXCHANGE_URL)
            .then((result) => {
                // console.log(result.data.data);
                setExchanges(result.data.data);
            })
    }, []);

    // console.log(exchanges);

    return (
        <div className="Exchanges">
            <Typography variant="h3" component={'h1'}>Exchanges</Typography>
            {exchanges.map((item, index) => <SingleExchange key={index} item={item} />)}
        </div>
    );
}

export default Exchanges;
