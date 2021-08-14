import Header from "../libs/Header"
import '../styles/movieDetail.css'

function MovieDetail() {
    return (
        <>
            <Header>
                Movie Details
            </Header>
            <div style={{padding:"20px"}}>
                <div className="movieDetailContainer">
                    <div className="moviePicture">
                        <img src="" alt="Movie Picture" />
                    </div>
                    <div className="movieDetail">
                        <div>Movie Title</div>
                        <div className="movieYearLengthDirector">
                            <div>Year |</div>
                            <div>Year |</div>
                            <div>Year |</div>
                        </div>
                        <div className="movieCastDetails">
                            <div>Cast:</div>
                            <div>Actor 1</div>
                        </div>
                        <div className="movieDescription">
                            <div>some description some descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome description
                                some descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome description
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default MovieDetail