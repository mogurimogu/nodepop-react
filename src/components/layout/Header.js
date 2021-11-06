import { useContext } from 'react';
import AuthContext from '../auth/context';
import { Link } from "react-router-dom";
import "./styles/header.scss";

function Header() {
  const { isLogged, handleLogout } = useContext(AuthContext);
  return (
    <header id="header-nav">
      <nav>
        <Link to="/">
          <h1>Nodepop</h1>
        </Link>
        {isLogged ? (
          <div>
            <Link to="/new-ad">
              <button>nuevo</button>
            </Link>
            <button onClick={handleLogout}>Salir</button>
          </div>
        ) : (
          <div>
            <Link to="/login">
              <button>Acceder</button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
