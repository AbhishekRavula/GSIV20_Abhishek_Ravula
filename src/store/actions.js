export const SET_MOVIES = "SET_MOVIES";
export const ADD_MOVIES = "ADD_MOVIES";
export const SET_MOVIE_DETAIL = "SET_MOVIE_DETAIL";
export const SET_IS_SEARCHING = "SET_IS_SEARCHING";

export const setMovies = (movies, total_pages, type = ADD_MOVIES) => ({
  type: type,
  movies: movies,
  total_pages: total_pages,
});

export const setMovieDetail = (movieId, runtime, castList, director) => ({
  type: SET_MOVIE_DETAIL,
  movieId: movieId,
  runtime: runtime,
  castList: castList,
  director: director,
});
