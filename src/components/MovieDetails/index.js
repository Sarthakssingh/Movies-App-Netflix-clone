import './index.css'
import Header from '../Header'

const MovieDeatils = props => {
  const {movieDetails} = props
  const {
    title,
    adult,
    runtime,
    releaseDate,
    overview,
    posterPath,
  } = movieDetails

  const hours = Math.floor(runtime / 60)
  const minutes = runtime % 60
  const date = new Date(releaseDate)
  const year = date.getFullYear()

  return (
    <div
      className="sm-devices sample-height"
      style={{
        background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(24, 24, 24, 0.546875) 38.26%, #181818 92.82%, #181818 98.68%, #181818 108.61%),url(${posterPath})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        minHeight: '605px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />
      <div className="heading-container movie-info-content-container-sm-devices">
        <h1 className="home-poster-title">{title}</h1>
        <div className="runtime-container">
          <p className="movie-info-hrs-min">{`${hours}h ${minutes}m `}</p>
          <p className="movie-info-a-ua">{adult ? 'A' : 'U/A'}</p>
          <p className="movie-info-year">{year}</p>
        </div>
        <p className="home-poster-overview">{overview}</p>
        <button className="home-poster-play-btn" type="button">
          Play
        </button>
      </div>
    </div>
  )
}

export default MovieDeatils
