import "./AddNewSong.css";
import axios from "axios";
import { useState } from "react";
import { Song } from "../../../model/song";
import { useNavigate } from "react-router-dom";
import { addSong } from "../../../store/songsSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

function AddNewSong(): JSX.Element {
  const API_KEY = "AIzaSyCSNr_wd1yco02Zg3wZLzLV7ByNb5TU0_g";
  const API_ENDPOINT = `https://www.googleapis.com/youtube/v3/videos?part=snippet&key=${API_KEY}&id=`;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.categories);

  const [title, setTitle] = useState("");
  const [songId, setSongId] = useState("");
  const [songImg, setSongImg] = useState("");
  const [category, setCategory] = useState("");

  const handleSearch = () => {
    axios.get(API_ENDPOINT + songId).then((res) => {
      let songData = res.data.items[0].snippet;
      console.log(songData);
      setTitle(songData.title);
      setSongImg(songData.thumbnails.standard.url);
    });
  };

  const handleAddSong = async () => {
    try {
      if (category === "") throw new Error("Category is required");
      const foundCategory = await axios.get(
        `http://localhost:3030/api/categories/${category}`
      );
      if (!foundCategory.data) throw new Error("Category not found");
      const newSong = new Song(
        foundCategory.data,
        songImg,
        title,
        `https://www.youtube.com/watch?v=${songId}`
      );

      const addedSong = await axios.post(
        "http://localhost:3030/api/songs/add",
        newSong
      );
      if (addedSong.status === 201) {
        dispatch(addSong(addedSong.data));
        navigate("/");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const getCategory = () => {
    return (
      <select
        required
        onChange={(args) => setCategory(args.currentTarget.value)}
      >
        <option>-- Select Category --</option>
        {categories.map((item, index) => (
          <option value={item} key={index}>
            {item}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div className="AddNewSong">
      <div className="Box">
        <h2>Add new Song</h2>
        <hr />
        <input
          type="text"
          placeholder="Enter YouTube Song ID"
          onKeyUp={(args) => {
            setSongId(args.currentTarget.value);
          }}
        />
        <input type="button" value="search" onClick={handleSearch} />
      </div>

      {title && <hr />}
      <h3>{title}</h3>
      <br />
      <img src={songImg} width={320} />
      <br />
      <br />
      {title.length > 0 && getCategory()}
      <br />
      <br />
      {title.length > 0 && (
        <input
          type="button"
          value="add song"
          onClick={handleAddSong}
          className="custom-button"
        />
      )}
    </div>
  );
}

export default AddNewSong;
