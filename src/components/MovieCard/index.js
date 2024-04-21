import {Link} from 'react-router-dom'
import './index.css'

const MovieCard = props => {
  const {movieDetails} = props
  const {posterPath, id, title} = movieDetails

  return (
    <div>
      <Link to={`/movies/${id}`}>
        <img src={posterPath} alt={title} className="movie-card" />
      </Link>
    </div>
  )
}
export default MovieCard
