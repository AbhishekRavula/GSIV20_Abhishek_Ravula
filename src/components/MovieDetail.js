import { useState, useEffect } from "react"
import Header from "../libs/Header"
import '../styles/movieDetail.css'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

function MovieDetail() {

    const [movieDetail, setmovieDetail] = useState([])
    const { movieId } = useParams()
    const movies = useSelector(state => state.searchedMovies.length > 1 ? state.searchedMovies : state.movies)

    useEffect(() => {
        movies.map(movie => {
            if (movie.id == movieId) {
                setmovieDetail(movie)
            }
        })
    }, [])

    return (
        <>
            <Header>
                Movie Details
            </Header>
            <div style={{ padding: "20px" }}>
                <div className="movieDetailContainer">
                    {movieDetail.picture ? <img src={`https://image.tmdb.org/t/p/w500/${movieDetail.picture}`} className="moviePicture" alt="Movie Picture" /> : 
                        <div className="moviePicture"/>}
                    <div className="movieDetail">
                        <div className="movieNameRating">
                            <div>{movieDetail.title}</div>
                            <div>{movieDetail.rating}</div>
                        </div>
                        <div className="movieYearLengthDirector">
                            {movieDetail.releaseDate && <div>{movieDetail.releaseDate.slice(0, 4)}</div>}
                            {console.log("runtime", movieDetail.runtime)}
                            {movieDetail.runtime != "0:0" && <div>| {movieDetail.runtime}</div>}
                            {movieDetail.director && <div>| {movieDetail.director}</div>}
                        </div>
                        <div className="movieCastDetails">
                            <div><b>Cast:</b> {movieDetail.cast && movieDetail.cast.join(", ")}</div>
                        </div>
                        <div className="movieDetailDescription">
                            <div><b>Description:</b> {movieDetail.description}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MovieDetail