import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import FailureView from '../FailureView'
import Footer from '../Footer'
import MovieDetails from '../MovieDetails'
import MovieCard from '../MovieCard'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieDetailsView extends Component {
  state = {
    movieDetails: [],
    genres: [],
    spokenLanguages: [],
    similarMovies: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = [data.movie_details].map(each => ({
        id: each.id,
        backdropPath: each.backdrop_path,
        budget: each.budget,
        title: each.title,
        overview: each.overview,
        originalLanguage: each.original_language,
        releaseDate: each.release_date,
        count: each.vote_count,
        rating: each.vote_average,
        runtime: each.runtime,
        posterPath: each.poster_path,
      }))
      const genresData = data.movie_details.genres.map(each => ({
        id: each.id,
        name: each.name,
      }))
      const updatedSimilarMovies = data.movie_details.similar_movies.map(
        each => ({
          id: each.id,
          posterPath: each.poster_path,
          title: each.title,
        }),
      )
      const updatedSopkenLanguages = data.movie_details.spoken_languages.map(
        each => ({
          id: each.id,
          language: each.english_name,
        }),
      )

      this.setState({
        movieDetails: updatedData,
        genres: genresData,
        spokenLanguages: updatedSopkenLanguages,
        similarMovies: updatedSimilarMovies.slice(0, 6),
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  onRetry = () => {
    this.getMovieDetails()
  }

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" height={35} width={380} color=" #D81F26" />
    </div>
  )

  renderSuccessView = () => {
    const {movieDetails, genres, spokenLanguages, similarMovies} = this.state
    const newMovieDetails = {...movieDetails[0]}
    const {releaseDate, count, rating, budget} = newMovieDetails
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    const d = new Date(releaseDate)
    const monthName = months[d.getMonth()]
    const date = new Date(releaseDate)
    const year = date.getFullYear()
    const day = date.getDay().toString()
    let dateEndingWord
    if (day.endsWith('1')) {
      dateEndingWord = 'st'
    } else if (day.endsWith('2')) {
      dateEndingWord = 'nd'
    } else if (day.endsWith('3')) {
      dateEndingWord = 'rd'
    } else {
      dateEndingWord = 'th'
    }
    const UpadtedrelaseDate = `${day}${dateEndingWord} ${monthName} ${year}`

    return (
      <>
        <div className="">
          <div>
            {movieDetails.map(each => (
              <MovieDetails movieDetails={each} key={each.id} />
            ))}
          </div>
        </div>
        <div className="additional-movie-info-container additional-info-sm-container">
          <ul className="each-genre-ul-container">
            <h1 className="movie-info-genre-heading">Genres</h1>
            {genres.map(eachGenre => (
              <li className="movie-info-each-genre" key={eachGenre.id}>
                <p>{eachGenre.name}</p>
              </li>
            ))}
          </ul>
          <ul className="each-genre-ul-container">
            <h1 className="movie-info-genre-heading">Audio Available</h1>
            {spokenLanguages.map(eachAudio => (
              <li className="movie-info-each-genre" key={eachAudio.id}>
                <p>{eachAudio.language}</p>
              </li>
            ))}
          </ul>
          <div className="each-genre-ul-container">
            <h1 className="movie-info-rating-count-heading">Rating Count</h1>
            <p className="movie-info-rating-count">{count}</p>
            <h1 className="movie-info-rating-avg-heading">Rating Average</h1>
            <p className="movie-info-rating">{rating}</p>
          </div>
          <div className="each-genre-ul-container">
            <h1 className="movie-info-budget-heading">Budget</h1>
            <p className="movie-info-budget">{budget}</p>
            <h1 className="movie-info-release-date">Release Date </h1>
            <p className="movie-info-date">{UpadtedrelaseDate} </p>
          </div>
        </div>
        <div className="similar-movies-container">
          <h1 className="more-like-this">More like this</h1>
          <ul className="similar-ul-container">
            {similarMovies.map(each => (
              <Link to={`/movies/${each.id}`} key={each.id} target="blank">
                <MovieCard movieDetails={each} key={each.id} />
              </Link>
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderMovieDetailsView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderSuccessView()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      case apiStatusConstant.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="dummy">
        <div className="movie-details-view-container">
          <div
            className="video-details-view-container"
            data-testid="videoItemDetails"
          >
            {this.renderMovieDetailsView()}
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default MovieDetailsView
