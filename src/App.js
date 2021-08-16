import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import MoviesList from './components/MoviesList';
import MovieDetail from './components/MovieDetail'
import { useDispatch } from 'react-redux'
import { fetchMovies } from './store/reducer';
import { useEffect} from 'react'


function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchMovies())
  }, [])

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
  )
}

export default App;
