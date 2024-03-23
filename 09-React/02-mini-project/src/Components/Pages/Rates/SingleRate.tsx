import "./SingleRate.css";
import { CoinRate } from '../../model/CoinRate';
import { NavLink, useParams } from "react-router-dom";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { blue, blueGrey, deepPurple, yellow } from "@mui/material/colors";
import { useState } from "react";
import axios from "axios";

interface SingleCoinProps {
    item?: CoinRate
}

function SingleRate(props: SingleCoinProps): JSX.Element {

    const params = useParams();
    const [rateItem, setItem] = useState<CoinRate>();
    const RATE_ID_URL = 'http://api.coincap.io/v2/rates/';
    const { item } = props;

    if (params.id?.length != undefined && rateItem == undefined) {
        axios.get(RATE_ID_URL + params.id)
            .then((result) => {
                setItem(result.data.data);
                console.log("repeat");
            });
    }

    return (
        <Card className="SingleRate" sx={{
            maxWidth: 345,
            minWidth: 300,
            bgcolor: blueGrey[800],
            boxShadow: 10,
            borderRadius: 4,
            p: 1,
            m: 2,
        }} variant="outlined">
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {item ? item?.symbol : rateItem?.symbol}
                </Typography>
                <Typography>ID: {item ? item?.id : rateItem?.id}</Typography>
                <Typography>Currency Symbol: {item ? item?.currencySymbol : rateItem?.currencySymbol}</Typography>
                <Typography>Rate in USD: {item ? item?.rateUsd : rateItem?.rateUsd}</Typography>
                <Typography>Type: {item ? item?.type : rateItem?.type}</Typography>
                <Button variant="contained" sx={{ marginTop: '1rem', backgroundColor: yellow[600], '&:hover': { backgroundColor: yellow[800] } }}>
                    <NavLink to={`/rates/${item ? item?.id : rateItem?.id}`}>Learn More</NavLink>
                </Button>
            </CardContent>
        </Card>
    );
}

export default SingleRate;
