import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa'

import MovieCard from '../../MovieCard'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

class TrendingNow extends Component {
  state = {
    trendingMovies: [],
    isLoading: false,
  }

  componentDidMount() {
    this.getTrendingMovies()
  }

  getTrendingMovies = async () => {
    this.setState({isLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/movies-app/trending-movies'
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
        trendingMovies: updatedData,
        isLoading: false,
      })
    }
  }

  renderTrendingMovie = () => {
    const {trendingMovies} = this.state
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
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
      nextArrow: <FaChevronRight className="slick-arrow" />,
      prevArrow: <FaChevronLeft className="slick-arrow" />,
    }
    return (
      <Slider {...settings}>
        {trendingMovies.map(eachItem => (
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

  render() {
    const {isLoading} = this.state
    return (
      <div className="trending-container">
        <div className="trending-slide">
          {isLoading ? this.renderLoader() : this.renderTrendingMovie()}
        </div>
      </div>
    )
  }
}
export default TrendingNow