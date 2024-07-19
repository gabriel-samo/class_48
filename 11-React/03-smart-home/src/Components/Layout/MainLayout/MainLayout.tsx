import { Box } from "@mui/material";
import "./MainLayout.css";
import MainHeader from "../MainHeader/MainHeader";
import MainMenu from "../MainMenu/MainMenu";
import MainFooter from "../MainFooter/MainFooter";
import MainBody from "../MainBody/MainBody";

function MainLayout(): JSX.Element {
    return (
        <div className="MainLayout">
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
