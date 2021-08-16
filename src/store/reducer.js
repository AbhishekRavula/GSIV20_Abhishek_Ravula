import { setNewMovies, setMovieDetail, setSearchedMovies, SET_MOVIES, SET_MOVIE_DETAIL, SET_SEARCHED_MOVIES } from './actions';


let initialState = {
    movies: [],
    searchedMovies: [],
    page: 1,
    totalPages: 1
}

const formatHourMinute = (seconds) => {
    let hours = seconds / 60
    let actualHours = Math.floor(hours)
    let minutes = (hours - actualHours) * 60
    let actualMinutes = Math.round(minutes)
    return actualHours + ":" + actualMinutes
}

const assignMovieDetail = (movies, action) => {
    movies.map(movie => {
        if (movie.id == action.movieId) {
            movie.runtime = formatHourMinute(action.runtime)
            movie.cast = [...action.castList]
            movie.director = action.director
        }
    })
}

export const moviesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MOVIES:
            return { ...state, movies: [...state.movies, ...action.movies], page: state.page + 1, totalPages: action.totalPages }
        case SET_MOVIE_DETAIL:
            if (action.searched) {
                assignMovieDetail(state.searchedMovies, action)
            }
            else {
                assignMovieDetail(state.movies, action)
            }
            return state
        case SET_SEARCHED_MOVIES:
            return { ...state, searchedMovies: [...action.searchedMovies] }
        default:
            return state
    }
}


const pushMovies = (movies) => {
    let moviesList = []
    movies.forEach(movie => {
        moviesList.push({
            id: movie.id,
            title: movie.title,
            description: movie.overview,
            rating: movie.vote_average,
            picture: movie.poster_path,
            releaseDate: movie.release_date,
            runtime: null,
            director: null,
            cast: []
        })
    })
    return moviesList
}

export const fetchMovies = () => async (dispatch, getState) => {
    const moviesResponse = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=38823a2945a8ce9064c5179995d53a2e&language=en-US&page=${getState().page}&sort_by=primary_release_date.desc&release_date.gte=2021-08-16&with_release_type=2|3`)
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
    let director = ""
    let runtime = movieDetailJson.status_message != "The resource you requested could not be found." && movieDetailJson.runtime ? movieDetailJson.runtime : null
    if (!castCrewJson.status_message) {
        if (castCrewJson.cast) {
            castCrewJson.cast && castCrewJson.cast.map(cast => {
                castList.push(cast.name)
            })
        }
        if (castCrewJson.crew) {
            castCrewJson.crew && castCrewJson.crew.map(crew => {
                if (crew.job == "Director") {
                    director = crew.name
                }
            })
        }
        console.log("inner", castList)
    }
    dispatch(setMovieDetail(searched, movieId, runtime, castList, director))
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