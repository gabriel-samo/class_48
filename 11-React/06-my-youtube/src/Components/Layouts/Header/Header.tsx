import "./Header.css";
import { useAppSelector } from "../../../store/hooks";

function Header(): JSX.Element {

    const totalSongs = useAppSelector(state => state.songs.songs.length)

    return (
        <div className="Header">
            <h1>Songs Playlist</h1>
            <p>Total songs in the system {totalSongs}</p>
        </div>
    );
}

export default Header;
