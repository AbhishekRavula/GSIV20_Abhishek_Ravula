import { useHistory } from "react-router-dom";
import "../styles/moviesList.css";
import Grid from "../libs/Grid";
import Header from "../libs/Header";
import Search from "./Search";
import { useDispatch, connect } from "react-redux";
import {
  fetchMovieDetails,
  fetchMovies,
  fetchSearchResults,
} from "../store/reducer";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect } from "react";
import { ADD_MOVIES } from '../store/actions';


function MoviesList(props) {
  const dispatch = useDispatch();

  const loadMovies = () => {
    if (props.isSearching) {
      dispatch(fetchSearchResults(ADD_MOVIES));
    } else {
      dispatch(fetchMovies());
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <>
      <Header>
        <Search />
      </Header>
      <InfiniteScroll
        dataLength={props.movies.length}
        hasMore={props.page <= props.total_pages}
        next={loadMovies}
        loader={<h4>Loading...</h4>}
        scrollThreshold={1}
      >
        <Grid>
          {props.movies.map((movie) => {
            return <MovieCard key={movie.id} movie={movie} />;
          })}
        </Grid>
      </InfiniteScroll>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    page: state.page,
    total_pages: state.total_pages
  };
};

export default connect(mapStateToProps)(MoviesList);

function MovieCard({ movie }) {
  let history = useHistory();
  const dispatch = useDispatch();

  const routeToMovieDetail = async (movieId) => {
    await dispatch(fetchMovieDetails(movieId));
    history.push(`/detail/${movie.id}`);
  };

  return (
    <div className="movieCard" onClick={() => routeToMovieDetail(movie.id)}>
      {movie.picture ? (
        <img
          className="movieCardPicture"
          src={`https://image.tmdb.org/t/p/w500/${movie.picture}`}
          alt="movie picture"
        />
      ) : (
        <div className="movieCardPicture" />
      )}
      <div className="movieTitleRatingDescription">
        <div className="movieTitleAndRating">
          <div>{movie.title}</div>
          <div>({movie.rating})</div>
        </div>
        <div className="movieDescription">{movie.description}</div>
      </div>
    </div>
  );
}
