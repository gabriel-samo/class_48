import "./SongList.css";
import SingleSong from "../SingleSong/SingleSong";
import { youtube } from "../../../redux/store";
import { Song } from "../../../model/song";
import { useEffect, useState } from "react";
import { downloadSongAction } from "../../../redux/SongReducer";


function SongList(): JSX.Element {
  const [songList, setSongList] = useState<Song[]>([]);

  useEffect(() => {
    if (youtube.getState().songs.allSongs.length < 1) {
      let mySongs = JSON.parse(localStorage.getItem("mySongs") || "[]");
      if (mySongs.length > 0) {
        setSongList(mySongs);
        youtube.dispatch(downloadSongAction(mySongs));
      }
    }
  }, []);

  // youtube.dispatch(downloadSongAction(songList));

  return (
    <div className="SongList">
      <h1>Song List</h1>
      {youtube.getState().songs.allSongs.map((item, index) => (
        <SingleSong key={index} item={item} />
      ))}
    </div>
  );
}

export default SongList;
