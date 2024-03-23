import "./SingleCoin.css";
import { CoinRate } from '../../model/CoinRate';

// type SingleCoinProps {
//     id: String;
//     symbol: String;
//     rateUsd: String;
// }

function SingleCoin(props: CoinRate): JSX.Element {
    return (
        <div className="SingleCoin Box">
            <h2>{props.symbol}</h2>
            <div>ID: {props.id}</div>
            <div>Currency Symbol: {props.currencySymbol}</div>
            <div>Rate in USD: {props.rateUsd}</div>
            <div>Type: {props.type}</div>
        </div>
    );
}

export default SingleCoin;
