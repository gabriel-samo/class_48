import { useParams } from "react-router-dom"

export default function SingleAsset(): JSX.Element {
    const params = useParams();
    return (
        <h1>Asset details of: {params.id}</h1>
    )
}