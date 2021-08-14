import { useHistory } from 'react-router-dom';
import '../styles/MoviesList.css';
import Grid from '../libs/Grid'

function MoviesList() {
    var arr = [1, 2, 3, 4, 5, 6]
    return (
        <Grid>
            {arr.map(card => {
                return <MovieCard />
            })}
        </Grid>
    )    
}
export default MoviesList


function MovieCard() {
    let history = useHistory()
    return (
        <div className="MovieCard" onClick={() => history.push("/detail/")}>
            <div className="MoviePicture">
                <img src="" alt="Movie Picture" />
            </div>
            <div className="MovieTitleAndRating">
                <div>Movie Title</div>
                <div>(Rating)</div>
            </div>
            <div className="MovieDescription">
                <div>Description</div>
            </div>
        </div>
    )
}