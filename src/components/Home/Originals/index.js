import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa'
import FailureView from '../../FailureView'

import MovieCard from '../../MovieCard'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Originals extends Component {
  state = {
    originalMovies: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getOriginalMovies()
  }

  getOriginalMovies = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.results.map(results => ({
        backdropPath: results.backdrop_path,
        overview: results.overview,
        id: results.id,
        posterPath: results.poster_path,
        title: results.title,
      }))
      this.setState({
        originalMovies: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  renderOriginals = () => {
    const {originalMovies} = this.state
    const settings = {
      dots: false,
      infinite: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      nextArrow: <FaChevronRight className="slick-arrow" />,
      prevArrow: <FaChevronLeft className="slick-arrow" />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }
    return (
      <Slider {...settings}>
        {originalMovies.map(eachItem => (
          <MovieCard movieDetails={eachItem} key={eachItem.id} />
        ))}
      </Slider>
    )
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader
        data-testid="loader"
        type="TailSpin"
        height={35}
        width={380}
        color=" #D81F26"
      />
    </div>
  )

  onRetry = () => {
    this.getOriginalMovies()
  }

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderOriginals()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      case apiStatusConstant.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }
}

export default Originals
