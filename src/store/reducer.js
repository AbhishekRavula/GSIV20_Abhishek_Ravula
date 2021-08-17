import {
  setMovies,
  setMovieDetail,
  SET_MOVIES,
  ADD_MOVIES,
  SET_MOVIE_DETAIL,
  SET_IS_SEARCHING
} from "./actions";

let initialState = {
  movies: [],
  page: 1,
  total_pages: 1
};

const formatHourMinute = (seconds) => {
  let hours = seconds / 60;
  let actualHours = Math.floor(hours);
  let minutes = (hours - actualHours) * 60;
  let actualMinutes = Math.round(minutes);
  return actualHours + ":" + actualMinutes;
};

const assignMovieDetail = (movies, action) => {
  movies.forEach((movie) => {
    if (movie.id == action.movieId) {
      movie.runtime = formatHourMinute(action.runtime);
      movie.cast = [...action.castList];
      movie.director = action.director;
    }
  });
};

export const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIES:
      return {
        movies: action.movies,
        page: 2,
        total_pages: action.total_pages,
      };
    case ADD_MOVIES:
      return {
        movies: [...state.movies, ...action.movies],
        page: state.page + 1,
        total_pages: action.total_pages,
      };
    case SET_MOVIE_DETAIL:
      assignMovieDetail(state.movies, action);
      return state;
    case SET_IS_SEARCHING:
      return {
        ...state,
        isSearching: action.isSearching
      }
    default:
      return state;
  }
};

const parseMoviesData = (movies) => {
  let moviesList = [];
  if (movies == null) {
    return moviesList;
  }
  movies.forEach((movie) => {
    moviesList.push({
      id: movie.id,
      title: movie.title,
      description: movie.overview,
      rating: movie.vote_average,
      picture: movie.poster_path,
      releaseDate: movie.release_date,
      runtime: null,
      director: null,
      cast: [],
    });
  });
  return moviesList;
};

export const fetchMovies = (type = ADD_MOVIES) => async (dispatch, getState) => {
  const apiResponse = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${
      process.env.REACT_APP_MOVIE_DATABASE_API_KEY
    }&language=en-US&page=${
      type === ADD_MOVIES ? getState().page : 1
    }&sort_by=primary_release_date.desc&release_date.gte=2021-08-16&with_release_type=2|3`
  );
  if (apiResponse.status === 200) {
    const moviesData = await apiResponse.json();
    const movieResults = parseMoviesData(moviesData.results);
    dispatch(setMovies(movieResults, moviesData.total_pages, type));
  }
};

export const fetchMovieDetails = (movieId) => async (dispatch) => {
  const movieDetailResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_MOVIE_DATABASE_API_KEY}&language=en-US`
  );
  const movieDetailJson = await movieDetailResponse.json();
  const castCrewResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.REACT_APP_MOVIE_DATABASE_API_KEY}a2e&language=en-US`
  );
  const castCrewJson = await castCrewResponse.json();
  let castList = [];
  let director = "";
  let runtime =
    movieDetailJson.status_message !=
      "The resource you requested could not be found." &&
    movieDetailJson.runtime
      ? movieDetailJson.runtime
      : null;
  if (!castCrewJson.status_message) {
    if (castCrewJson.cast) {
      castCrewJson.cast &&
        castCrewJson.cast.map((cast) => {
          castList.push(cast.name);
        });
    }
    if (castCrewJson.crew) {
      castCrewJson.crew &&
        castCrewJson.crew.map((crew) => {
          if (crew.job == "Director") {
            director = crew.name;
          }
        });
    }
  }
  dispatch(setMovieDetail(movieId, runtime, castList, director));
};

export const fetchSearchResults = (searchTerm, type = SET_MOVIES, pageIndex = null) => async (dispatch, getState) => {
  if (searchTerm !== "") {
    const searchResultsResponse = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=38823a2945a8ce9064c5179995d53a2e&language=en-US&page=${pageIndex ? pageIndex : getState().page}&include_adult=false`
    );
    if (searchResultsResponse.status === 200) {
      const searchResultsJson = await searchResultsResponse.json();
      let movies = parseMoviesData(searchResultsJson.results);
      dispatch(setMovies(movies, searchResultsJson.total_pages, type));
    }
  }
};
