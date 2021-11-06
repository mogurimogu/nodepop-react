import { Link } from "react-router-dom";
import "./styles/header.scss";

function Header() {
  return (
    <header id="header-nav">
      <nav>
        <Link to="/">
          <h1>Nodepop</h1>
        </Link>
        <div>
          <Link to="/new-ad">
            <button>nuevo</button>
          </Link>
          <Link to="/login">
            <button>login</button>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
