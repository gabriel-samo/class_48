import "./SongList.css";
import SingleSong from "../SingleSong/SingleSong";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { removeCategory } from "../../../store/categorySlice";

function SongList(): JSX.Element {
  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let mySongs = useAppSelector(state => state.songs.songs);

  if (params.catName !== undefined) {
    mySongs = mySongs.filter(item => item.songCat === params.catName);
  }

  return (
    <div className="SongList">
      <div className="headerItem">
        {params.catName ? <h2>Category: {params.catName}</h2> : <h2>Song List</h2>}
        {params.catName && <input type="button" value="Delete Category" onClick={() => {
          dispatch(removeCategory(params.catName!));
          navigate('/');
        }} />}
      </div>
      {mySongs.map((item, index) => (
        <SingleSong key={index} item={item} />
      ))}
    </div>
  );
}

export default SongList;
