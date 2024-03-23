import { useParams } from "react-router-dom"

export default function SingleAssetHistory(): JSX.Element {
    const params = useParams();
    return (
        <h1>Asset history of: {params.id}</h1>
    )
}