import { Provider } from "react-redux";
import MainRoute from "../../Routes/MainRoute/MainRoute";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MainMenu from "../MainMenu/MainMenu";
import "./MainLayout.css";
import { store } from "../../../store/store";

function MainLayout(): JSX.Element {
    return (
        <Provider store={store}>
            <div className="MainLayout">
                <header>
                    <Header />
                </header>
                <aside>
                    <MainMenu />
                </aside>
                <main>
                    <MainRoute />
                </main>
                <footer>
                    <Footer />
                </footer>
            </div>
        </Provider>
    );
}

export default MainLayout;
