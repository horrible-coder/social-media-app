import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";

//const LS_PREFIX = "status-share-";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
