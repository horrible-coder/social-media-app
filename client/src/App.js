import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";

const LS_PREFIX = "status-share-";

function App() {
  return (
    <Router>
      <Switch>
        {localStorage.getItem(LS_PREFIX + "id") ? (
          <>
            <Redirect to="/" />
            <Route exact path="/" component={Home} />
          </>
        ) : (
          <>
            <Redirect to="/login" />
            <Route exact path="/login" component={Login} />
          </>
        )}
      </Switch>
    </Router>
  );
}

export default App;
