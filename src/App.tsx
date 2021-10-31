import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import UserPage from "./pages/UserPage";
import Error from "./pages/Error";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/user/:login">
            <UserPage />
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
