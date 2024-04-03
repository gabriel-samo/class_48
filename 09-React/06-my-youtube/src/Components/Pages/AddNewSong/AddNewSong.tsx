import { useState } from "react";
import "./AddNewSong.css";
import axios from "axios";
import { Song } from "../../../model/song";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addSong } from "../../../store/songsSlice";

function AddNewSong(): JSX.Element {
  const API_KEY = "AIzaSyCSNr_wd1yco02Zg3wZLzLV7ByNb5TU0_g";
  const API_ENDPOINT = `https://www.googleapis.com/youtube/v3/videos?part=snippet&key=${API_KEY}&id=`;

  const songList = useAppSelector(state => state.songs.songs);
  const categories = useAppSelector(state => state.categories.categories)
  const dispatch = useAppDispatch();

  const [songId, setSongId] = useState("");
  const [songName, setSongName] = useState("");
  const [songDesc, setSongDesc] = useState("");
  const [songImageURL, setSongImageURL] = useState("");
  const [songCategory, setSongCategory] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {
    axios.get(API_ENDPOINT + songId).then((res) => {
      // console.log(res.data.items[0].snippet);
      let songData = res.data.items[0].snippet;
      setSongName(songData.title);
      setSongDesc(songData.description);
      setSongImageURL(songData.thumbnails.standard.url);
    });
  };

  const handleAddSong = () => {
    const newSong = new Song(songId, songName, songDesc, songImageURL, songCategory)
    dispatch(addSong(newSong))
    navigate("/");
  };

  const getCategory = () => {
    return (
      <select onChange={(args => setSongCategory(args.currentTarget.value))}>
        {categories.map((item, index) => <option value={item} key={index}>{item}</option>)}
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

      {songName && <hr />}
      <h3>{songName}</h3>
      <br />
      <img src={songImageURL} width={320} />
      <br />
      <div className="Desc">{songDesc}</div>
      <br />
      <br />
      {songDesc.length > 0 && getCategory()}<br /><br />
      {songDesc.length > 0 && (
        <input type="button" value="add song" onClick={handleAddSong} className="custom-button" />
      )}

    </div>
  );
}

export default AddNewSong;
