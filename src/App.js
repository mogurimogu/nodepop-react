import "./styles/index.scss";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { LoginPage, PrivateRoute } from "./components/auth/";
import { AdvertsPage, NewAdPage } from "./components/adverts/";
import { AuthContextProvider } from "./components/auth/context";
import { useState } from "react";
import { logout } from "./components/auth/service";

function App({ isInitiallyLogged }) {
  const [isLogged, setIsLogged] = useState(isInitiallyLogged);

  const handleLogin = () => {
    setIsLogged(true);
  };

  const handleLogout = () => {
    logout().then(() => setIsLogged(false));
  };

  return (
    <Router>
      <AuthContextProvider value={{ isLogged, handleLogout, handleLogin }}>
        <div className="app">
          <Switch>
            <Route path="/login">
              {isLogged ? (
                <Redirect to="/" />
              ) : (
                (routeProps) => <LoginPage {...routeProps} />
              )}
            </Route>

            <PrivateRoute path="/new-ad">
              <NewAdPage />
            </PrivateRoute>

            {/* 
              <Route path="/tweets/:tweetId">
                {(routeProps) => (
                  <TweetPage ref={tweetPageInstance} {...routeProps} />
                )}
              </Route> 
            */}

            <PrivateRoute path="/adverts" component={AdvertsPage} />

            <Route exact path="/">
              <Redirect to="/adverts" />
            </Route>

            <Route path="/404">
              <div>404 | Not Found Page</div>
            </Route>
            <Route>
              <Redirect to="/404" />
            </Route>
          </Switch>
        </div>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
