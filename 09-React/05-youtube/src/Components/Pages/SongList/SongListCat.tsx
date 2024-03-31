import { useEffect, useState } from "react";
import { Song } from "../../../model/song";
import { youtube } from "../../../redux/store";
import { downloadSongAction } from "../../../redux/SongReducer";
import { useParams } from "react-router-dom";
import SingleSong from "../SingleSong/SingleSong";

export default function SongListCat() {
    const params = useParams();
    const [songList, setSongList] = useState<Song[]>([]);
    const [songCat, setCat] = useState(params.catName || '');

    useEffect(() => {
        if (params.catName !== undefined && songCat.length > 0) {
            setCat(params.catName);
        }

        if (youtube.getState().songs.allSongs.length < 1) {
            let mySongs = JSON.parse(localStorage.getItem("mySongs") || "[]");
            if (mySongs.length > 0) {
                mySongs = mySongs.filter((item: Song) => item.songCat === songCat.toString());
                setSongList(mySongs);
                youtube.dispatch(downloadSongAction(mySongs));
            }
        }
    }, []);

    youtube.subscribe(() => {
        setSongList(youtube.getState().songs.allSongs)
    });

    return (
        <div className="SongListCat">
            <h1>Category: {params.catName}</h1>
            {songList.map((item, index) => (
                <SingleSong key={index} item={item} />
            ))}
        </div>
    )
}