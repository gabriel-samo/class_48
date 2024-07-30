import "./SongList.css";
import SingleSong from "../SingleSong/SingleSong";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { removeCategory } from "../../../store/categorySlice";
import { useEffect, useState } from "react";

function SongList(): JSX.Element {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const allSongs = useAppSelector((state) => state.songs.songs);
  const [mySongs, setMySongs] = useState(allSongs);

  useEffect(() => {
    if (params.catName) {
      setMySongs(allSongs.filter((item) => item.songCat === params.catName));
    } else {
      setMySongs(allSongs);
    }
  }, [params.catName]);

  return (
    <div className="SongList">
      <div className="headerItem">
        {params.catName ? (
          <h2>Category: {params.catName}</h2>
        ) : (
          <h2>Song List</h2>
        )}
        {params.catName && (
          <input
            type="button"
            value="Delete Category"
            onClick={() => {
              dispatch(removeCategory(params.catName!));
              navigate("/");
            }}
          />
        )}
      </div>
      {mySongs.map((item, index) => (
        <SingleSong key={index} item={item} />
      ))}
    </div>
  );
}

export default SongList;
