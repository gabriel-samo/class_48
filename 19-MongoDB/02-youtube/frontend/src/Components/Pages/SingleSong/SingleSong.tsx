import "./SingleSong.css";
import axios from "axios";
import { Song } from "../../../model/song";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import { removeSong } from "../../../store/songsSlice";

interface itemProps {
  item: Song;
}

function SingleSong(props: itemProps): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleRemoveSong = () => {
    axios.delete(`http://localhost:3030/api/songs/delete/${props.item.id}`);
    dispatch(removeSong(props.item.id!));
  };

  return (
    <div className="SingleSong">
      <div className="Box" style={{ width: "95%" }}>
        <div className="Grid-Parent">
          <div
            className="Grid-Child"
            onClick={() => {
              navigate(`/player/${props.item.title}/${props.item.id}`);
            }}
          >
            <img src={props.item.songImg} width={200} />
          </div>
          <div className="Grid-Child">
            <div className="Title-Header">
              <span>Name: {props.item.title}</span>{" "}
              <span>Category: {props.item.category.name}</span>
            </div>
            <hr />
            <div className="desc">{props.item.url}</div>
            <br />
            <br />
            <input
              type="button"
              value="remove song"
              onClick={handleRemoveSong}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleSong;
