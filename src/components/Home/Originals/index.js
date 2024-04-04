import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa'

import MovieCard from '../../MovieCard'

import './index.css'

class Originals extends Component {
  state = {
    originalMovies: [],
    isLoading: false,
  }

  componentDidMount() {
    this.getOriginalMovies()
  }

  getOriginalMovies = async () => {
    this.setState({isLoading: true})
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
        isLoading: false,
      })
    }
  }

  renderOriginals = () => {
    const {originalMovies} = this.state
    const settings = {
      dots: false,
      infinite: true,
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

  render() {
    const {isLoading} = this.state
    return <>{isLoading ? this.renderLoader() : this.renderOriginals()}</>
  }
}

export default Originals
