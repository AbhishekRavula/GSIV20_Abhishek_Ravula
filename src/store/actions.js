export const SET_MOVIES = "SET_MOVIES";
export const SET_MOVIE_DETAIL = "SET_MOVIE_DETAIL";
export const SET_SEARCHED_MOVIES = "SET_SEARCHED_MOVIES";


export const setNewMovies = (movies, totalPages) => ({
    type: SET_MOVIES,
    movies: movies,
    totalPages: totalPages
})

export const setMovieDetail = (searched, movieId, runtime, castList, director) => ({
    type: SET_MOVIE_DETAIL,
    movieId: movieId,
    runtime: runtime,
    castList: castList,
    director: director,
    searched: searched
})

export const setSearchedMovies = (movies) => ({
    type: SET_SEARCHED_MOVIES,
    searchedMovies: movies
})