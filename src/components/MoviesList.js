import { useHistory } from 'react-router-dom';
import '../styles/MoviesList.css';
import Grid from '../libs/Grid';
import Header from '../libs/Header';
import SearchNav from './Search';
import { useDispatch, useSelector, connect } from 'react-redux'
import { fetchMovieDetails, fetchMovies } from '../store/reducer';
import InfiniteScroll from 'react-infinite-scroll-component';

function MoviesList(props) {

    const dispatch = useDispatch()

    const fetchMore = () => {
        dispatch(fetchMovies())
    }

    return (
        <>
            <Header>
                <SearchNav />
            </Header>
            {props.searchedMovies.length ?
                <Grid>
                    {props.searchedMovies.map(movie => {
                        return <MovieCard key={movie.id} movie={movie} searched={true} />
                    })}
                </Grid> :
            <InfiniteScroll dataLength={props.movies.length} 
                hasMore={props.page <= props.totalPages}
                next={fetchMore}
                loader={<h4>Loading...</h4>} scrollThreshold={1}
            >
                <Grid>
                    {props.movies.map(movie => {
                        return <MovieCard key={movie.id} movie={movie} searched={false} />
                    })}
                </Grid>
            </InfiniteScroll>}
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        movies: state.movies,
        searchedMovies: state.searchedMovies,
        page: state.page,
        totalPages: state.totalPages
    }
}

export default connect(mapStateToProps)(MoviesList)



function MovieCard({ movie, searched }) {

    let history = useHistory()
    const dispatch = useDispatch()
    const store = useSelector(state => state.movies)

    const routeToMovieDetail = async (movieId) => {
        await dispatch(fetchMovieDetails(movieId, searched))
        history.push(`/detail/${movie.id}`)
    }

    return (
        <>
            <div className="movieCard" onClick={() => routeToMovieDetail(movie.id)}>
                <div >
                    <img className="movieCardPicture" src={`https://image.tmdb.org/t/p/w500/${movie.picture}`} alt="movie picture" />
                </div>
                <div className="movieTitleRatingDescription">
                    <div className="movieTitleAndRating">
                        <div>{movie.title}</div>
                        <div>{movie.rating}</div>
                    </div>
                    <div className="movieDescription">{movie.description}</div>
                </div>
            </div>
        </>
    )
}
