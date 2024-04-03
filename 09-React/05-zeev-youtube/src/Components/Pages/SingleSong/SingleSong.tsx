import { useNavigate } from "react-router-dom";
import { Song } from "../../../model/song";
import "./SingleSong.css";

interface itemProps {
  item: Song;
}

function SingleSong(props: itemProps): JSX.Element {
  const navigate = useNavigate();
  return (
    <div className="SingleSong">
      <div className="Box" style={{ width: "95%" }}>
        <div className="Grid-Parent">
          <div
            className="Grid-Child"
            onClick={() => {
              navigate(`/player/${props.item.songName}/${props.item.id}`);
            }}
          >
            <img src={props.item.songImage.toString()} width={200} />
          </div>
          <div className="Grid-Child">
            <div className="Title-Header">
              <span>Name: {props.item.songName}</span> <span>Category: {props.item.songCat}</span>
            </div>
            <hr />
            {props.item.songDesc}<br /><br />
            <input type="button" value="remove song" onClick={() => {
              //todo: remove song :)
              console.log("bad bad simyon");
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleSong;
