import MainBody from "../MainBody/MainBody";
import MainFooter from "../MainFooter/MainFooter";
import MainHeader from "../MainHeader/MainHeader";
import MainMenu from "../MainMenu/MainMenu";
import "./MainLayout.css";

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
