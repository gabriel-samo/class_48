import { blueGrey, grey, indigo } from "@mui/material/colors";
import MainBody from "../MainBody/MainBody";
import MainFooter from "../MainFooter/MainFooter";
import MainHeader from "../MainHeader/MainHeader";
import MainMenu from "../MainMenu/MainMenu";
import "./MainLayout.css";

function MainLayout(): JSX.Element {

    const bgColor = blueGrey[900];
    return (
        <div className="MainLayout" style={{ backgroundColor: bgColor, color: 'white' }}>
            <header>
                <MainHeader />
            </header>
            <aside>
                <MainMenu />
            </aside>
            <main>
                <MainBody />
            </main>
            <footer>
                <MainFooter />
            </footer>
        </div>
    );
}

export default MainLayout;
