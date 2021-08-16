import { setNewMovies, setMovieDetail, setSearchedMovies, SET_MOVIES, SET_MOVIE_DETAIL, SET_SEARCHED_MOVIES} from './actions';


let initialState = {
    movies: [],
    searchedMovies: [],
    page: 1,
    totalPages: 1
}

const formatHourMinute = (seconds) => {
    let hours = seconds / 60
    let rhours = Math.floor(hours)
    let minutes = (hours - rhours) * 60
    let rminutes = Math.round(minutes)
    return rhours + ":" + rminutes
}

export const moviesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MOVIES: {
            return { ...state, movies: [...new Set([...state.movies, ...action.movies])], page: state.page + 1, totalPages: action.totalPages}
        }
        case SET_MOVIE_DETAIL:
            if (action.searched) {
                state.searchedMovies.map(movie => {
                    if (movie.id == action.movieId) {
                        movie.runtime = formatHourMinute(action.runtime)
                        movie.cast = [...action.castList]
                        movie.director = action.director
                    }
                })
            }
            else {
                state.movies.map(movie => {
                    if (movie.id == action.movieId) {
                        movie.runtime = formatHourMinute(action.runtime)
                        movie.cast = [...action.castList]
                        movie.director = action.director
                    }
                })
            }
            return state
        case SET_SEARCHED_MOVIES:
            return {...state, searchedMovies: [...action.searchedMovies]}
        default:
            return state
    }
}


const pushMovies = (movies) => {
    let moviesList = []
    movies.map(movie => {
        moviesList.push({
            id: movie.id,
            title: movie.title,
            description: movie.overview,
            rating: movie.vote_average,
            picture: movie.poster_path,
            year: movie.release_date && movie.release_date.slice(0, 4),
            runtime: null,
            director: null,
            cast: []
        })
    })
    return moviesList
}

export const fetchMovies = () => async (dispatch, getState) => {
    const moviesResponse = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=38823a2945a8ce9064c5179995d53a2e&language=en-US&page=${getState().page}`)
    const moviesJson = await moviesResponse.json()
    const movies = pushMovies(moviesJson.results)
    dispatch(setNewMovies(movies, moviesJson.total_pages))
}

export const fetchMovieDetails = (movieId, searched) => async (dispatch, getState) => {
    const movieDetailResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=38823a2945a8ce9064c5179995d53a2e&language=en-US`)
    const movieDetailJson = await movieDetailResponse.json()
    const castCrewResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=38823a2945a8ce9064c5179995d53a2e&language=en-US`)
    const castCrewJson = await castCrewResponse.json()
    let castList = []
    castCrewJson.cast.map(cast => {
        castList.push(cast.name)
    })
    let director = ""
    castCrewJson.crew.map(crew => {
        if (crew.job == "Director") {
            director = crew.name
        }
    })
    dispatch(setMovieDetail(searched, movieDetailJson.id, movieDetailJson.runtime, castList, director))
}


export const fetchSearchResults = (searchTerm) => async (dispatch) => {
    const searchResultsResponse = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=38823a2945a8ce9064c5179995d53a2e&language=en-US&page=1&include_adult=false`)
    const searchResultsJson = await searchResultsResponse.json()
    if (searchResultsJson.errors) {
        dispatch(setSearchedMovies([]))
    }
    else {
        let movies = pushMovies(searchResultsJson.results)
        dispatch(setSearchedMovies(movies))
    }
    
}