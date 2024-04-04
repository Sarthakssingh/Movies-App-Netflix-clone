import {Link} from 'react-router-dom'
import './index.css'

const MovieCard = props => {
  const {movieDetails} = props
  const {posterPath, id} = movieDetails

  return (
    <div>
      <Link to={`/movies/${id}`}>
        <img src={posterPath} alt="movie-card" className="movie-card" />
      </Link>
    </div>
  )
}
export default MovieCard
