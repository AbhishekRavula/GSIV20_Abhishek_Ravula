import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import MoviesList from './components/MoviesList';
import SearchNav from './components/SearchNav';
import MovieDetail from './components/MovieDetail'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <SearchNav/>
          <MoviesList />
        </Route>
        <Route exact path="/detail">
          <MovieDetail/>
        </Route>
      </Switch>
    </Router>
    )
}

export default App;
