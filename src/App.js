import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import MoviesList from "./components/MoviesList";
import MovieDetail from "./components/MovieDetail";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MoviesList />
        </Route>
        <Route exact path="/detail/:movieId">
          <MovieDetail />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;