import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import TrendingNow from './TrendingNow'
import Header from '../Header'
import Originals from './Originals'
import Footer from '../Footer'
import FailureView from '../FailureView'
import RenderLoading from '../RenderLoading'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    initialPoster: {},
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getHomePagePoster()
  }

  getHomePagePoster = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/originals`
    // const apiUrl = `https://apis.ccbp.in/movies-app/trending-movies`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const fetchedDataLength = data.results.length
      const randomPoster =
        data.results[Math.floor(Math.random() * fetchedDataLength)]
      const updatedData = {
        id: randomPoster.id,
        backdropPath: randomPoster.backdrop_path,
        title: randomPoster.title,
        overview: randomPoster.overview,
        posterPath: randomPoster.poster_path,
      }

      this.setState({
        initialPoster: {...updatedData},
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  onRetry = () => {
    this.getHomePagePoster()
  }

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

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

  renderSuccessView = () => {
    const {initialPoster} = this.state
    const {backdropPath, title, overview} = initialPoster
    return (
      <>
        <div
          className="devices-container"
          alt={title}
          style={{
            background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(24, 24, 24, 0.546875) 38.26%, #181818 92.82%, #181818 98.68%, #181818 108.61%),url(${backdropPath})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            minHeight: '605px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Header className="header-opacity" />
          <div className=" home-header-content heading-container">
            <h1 className=" movie-details-name home-poster-title" key={title}>
              {title}
            </h1>
            <h1
              className=" movie-details-description home-poster-overview"
              key={overview}
            >
              {overview}
            </h1>
            <button
              className=" movies-details-play-button  home-poster-play-btn"
              type="button"
            >
              Play
            </button>
          </div>
        </div>
      </>
    )
  }

  renderHomePoster = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderSuccessView()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      case apiStatusConstant.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return (
          <div className="home-container">
            {this.renderHomePoster()}
            <div className="bottom-container">
              <div className="main-container">
                <h1 className="section-heading">Trending Now</h1>
                <div className="slick-container">
                  <TrendingNow />
                </div>
              </div>
              <div className="main-container">
                <h1 className="section-heading">Originals</h1>
                <div className="slick-container">
                  <Originals />
                </div>
              </div>
            </div>
            <Footer />
          </div>
        )
      case apiStatusConstant.failure:
        return this.renderFailureView()
      case apiStatusConstant.inProgress:
        return this.renderLoader()

      default:
        return null
    }
  }
}

export default Home
