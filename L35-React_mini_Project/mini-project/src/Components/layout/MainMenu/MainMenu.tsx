import "./MainMenu.css";

function MainMenu(): JSX.Element {
    return (
        <div className="MainMenu">
            <ul className="mainList">
                <li>
                    Assets <hr />
                    <ul>
                        <li>/assets</li>
                        <li>/assets/((id))</li>
                        <li>/assets/((id))/history</li>
                        <li>/assets/((id))/markets</li>
                    </ul>
                </li>
                <br />
                <li>
                    Rates <hr />
                    <ul>
                        <li>/rates</li>
                        <li>/rates/((id))</li>
                    </ul>
                </li>
                <br />
                <li>
                    Exchanges <hr />
                    <ul>
                        <li>/exchanges</li>
                        <li>/exchanges/((id))</li>
                    </ul>
                </li>
                <br />
                <li>
                    Markets <hr />
                    <ul>
                        <li>/markets</li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}

export default MainMenu;
