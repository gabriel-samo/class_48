import { useParams } from "react-router-dom"

export default function SingleAssetMarkets(): JSX.Element {
    const params = useParams();
    return (
        <h1>Asset markets of: {params.id}</h1>
    )
}