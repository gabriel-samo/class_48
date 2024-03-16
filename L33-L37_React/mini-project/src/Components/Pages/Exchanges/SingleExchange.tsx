import { useEffect, useState } from "react";
import { ExchangeModal } from "../../model/ExchangeModel";
import "./Exchanges.css";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { Button, ButtonGroup, Card, CardActions, CardContent, Link, Typography } from "@mui/material";
import './SingleExchange.css'
import { blue, deepPurple } from "@mui/material/colors";

interface SingleExchange {
    item?: ExchangeModal
}

export default function SingleExchange(props: SingleExchange): JSX.Element {

    const params = useParams();
    const [exchangeItem, setItem] = useState<ExchangeModal>();
    const EXCHANGE_ITEM_URL = "http://api.coincap.io/v2/exchanges/";
    const { item } = props;

    if (params.id?.length != undefined && exchangeItem == undefined) {
        axios.get(EXCHANGE_ITEM_URL + params.id)
            .then((result) => {
                setItem(result.data.data);
                // console.log("repeat");
            });
    }

    return (
        <Card className="SingleExchange" sx={{
            maxWidth: 345,
            minWidth: 300,
            bgcolor: blue[900],
            boxShadow: 10,
            borderRadius: 4,
            p: 1,
            m: 2,
        }} variant="outlined">
            <CardContent>
                {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{item ? item.exchangeId : exchangeItem?.exchangeId}</Typography> */}
                <Typography gutterBottom variant="h5" component="div">{item ? item.name : exchangeItem?.name}</Typography>
                <Typography>Rank: {item ? item.rank : exchangeItem?.rank}</Typography>
                <Typography>Total Volume: {item
                    ? Number(item.percentTotalVolume).toLocaleString('en-US')
                    : Number(exchangeItem?.percentTotalVolume).toLocaleString('en-US')}
                </Typography>
                <Typography>Volume in USD: {item
                    ? Number(item.volumeUsd).toLocaleString('en-US')
                    : Number(exchangeItem?.volumeUsd).toLocaleString('en-US')}
                </Typography>
                <Typography>Trading Pairs: {item ? item.tradingPairs : exchangeItem?.tradingPairs}</Typography>
                <CardActions>
                    <ButtonGroup>
                        <Button variant="contained" color="secondary">
                            <a href={item ? item.exchangeUrl.toString() : exchangeItem?.exchangeUrl.toString()} target="_blank">Visit Coin Site</a>
                        </Button>
                        <Button variant="contained" color="primary">
                            <NavLink to={`/exchanges/${item?.exchangeId}`}>Learn More</NavLink>
                        </Button>
                    </ButtonGroup>
                </CardActions>
            </CardContent>
        </Card >
    );
}