import "./gang2.css";

interface Gang2Props {
    nodeId: number;
    name: String;
    epId: number;
    location?: String;
}

function Gang2(props: Gang2Props): JSX.Element {
    return (
        <div className="gang2 Box">
            Node ID: {props.nodeId} <br />
            Name: {props.name} <br />
            EndPoint ID: {props.epId} <br />
            Location: {props.location} <br />
            <input type="text" placeholder="Enter a Name" /><br />
            <input type="submit" value='Send' />
        </div>
    );
}

export default Gang2;
