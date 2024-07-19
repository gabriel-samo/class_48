import "./Header.css";

function Header(): JSX.Element {
  return (
    <div className="Header">
      <h1>Stimatzki Books Store</h1>
      <div className="logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/he/thumb/b/bc/Steimatzki.svg/269px-Steimatzki.svg.png?20140908165017"
          alt=""
        />
      </div>
    </div>
  );
}

export default Header;
