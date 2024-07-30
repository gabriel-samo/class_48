import "./SongList.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SingleSong from "../SingleSong/SingleSong";
import { setSongs } from "../../../store/songsSlice";
import { removeCategory } from "../../../store/categorySlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

function SongList(): JSX.Element {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const allSongs = useAppSelector((state) => state.songs.songs);
  const [mySongs, setMySongs] = useState(allSongs);

  useEffect(() => {
    axios
      .get("http://localhost:3030/api/songs")
      .then((res) => {
        if (params.catName) {
          dispatch(setSongs(res.data));
          setMySongs(
            res.data.filter(
              (item: any) => item.category.name === params.catName
            )
          );
        } else {
          dispatch(setSongs(res.data));
          setMySongs(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.catName]);

  const handleDelete = async () => {
    const deletedCat = await axios.delete(
      `http://localhost:3030/api/categories/${params.catName}`
    );
    console.log(deletedCat);
    if (deletedCat.status === 200) {
      dispatch(removeCategory(params.catName!));
      navigate("/");
    }
  };

  return (
    <div className="SongList">
      <div className="headerItem">
        {params.catName ? (
          <h2>Category: {params.catName}</h2>
        ) : (
          <h2>Song List</h2>
        )}
        {params.catName && (
          <input type="button" value="Delete Category" onClick={handleDelete} />
        )}
      </div>
      {mySongs.map((item, index) => (
        <SingleSong key={index} item={item} />
      ))}
    </div>
  );
}

export default SongList;
