import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'

import {HiOutlineSearch} from 'react-icons/hi'

import {MdMenuOpen} from 'react-icons/md'
import {ImCross} from 'react-icons/im'

import './index.css'

class Header extends Component {
  state = {
    showMenu: false,
    // showSearchBar: false,
    searchInp: '',
  }

  //   onClickSearchIcon = () => {
  //     this.setState(prevState => ({
  //       showSearchBar: !prevState.showSearchBar,
  //     }))
  //   }

  onClickSearchInpIcon = () => {
    const {searchInput} = this.props
    const {searchInp} = this.state
    searchInput(searchInp)
  }

  onClickShowMenu = () => {
    this.setState({showMenu: true}, this.renderSearchInput)
  }

  onClickHideMenu = () => {
    this.setState({showMenu: false})
  }

  onChangeSearchInput = event => {
    this.setState({searchInp: event.target.value})
    const {searchInput} = this.props
    if (event.key === 'Enter') {
      searchInput(event.target.value)
    }
  }

  renderSearchInput = () => {
    const {showSearchInputBlock} = this.props
    return (
      <>
        {showSearchInputBlock ? (
          <div className="search-input">
            <input
              type="search"
              onChange={this.onChangeSearchInput}
              placeholder="search"
              className="search"
            />
            <button
              type="button"
              className="search-button"
              testid="searchButton"
            >
              <HiOutlineSearch
                className="search-btn"
                size={20}
                color="white"
                onClick={this.onClickSearchInpIcon}
              />
            </button>
          </div>
        ) : (
          <Link to="/search">
            <button type="button" className="icon-button" testid="searchButton">
              <HiOutlineSearch
                className="search-btn"
                size={20}
                color="white"
                // onClick={this.onClickSearchIcon}
              />
            </button>
          </Link>
        )}
      </>
    )
  }

  renderHeader = () => {
    const {showMenu} = this.state
    const {match} = this.props
    const {path} = match
    let homeClassNameStyling
    let popularClassNameStyling
    let accountClassNameStyling
    switch (path) {
      case '/popular':
        homeClassNameStyling = 'passive'
        popularClassNameStyling = 'active'
        accountClassNameStyling = 'passive'
        break
      case '/account':
        homeClassNameStyling = 'passive'
        popularClassNameStyling = 'passive'
        accountClassNameStyling = 'active'
        break
      case '/':
        homeClassNameStyling = 'active'
        popularClassNameStyling = 'passive'
        accountClassNameStyling = 'passive'
        break
      default:
        homeClassNameStyling = 'passive'
        popularClassNameStyling = 'passive'
        accountClassNameStyling = 'passive'
        break
    }
    return (
      <nav className="nav-header">
        <div className="nav-content">
          <div className="nav-content-left">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dljgducmq/image/upload/v1711878197/Group_7399movies_me0br8.png"
                alt="website logo"
                className="website-logo"
              />
            </Link>
            <ul className="nav-menu">
              <Link to="/" className="nav-link">
                <li className={`popup-heading ${homeClassNameStyling}`}>
                  Home
                </li>
              </Link>
              <Link to="/popular" className="nav-link">
                <li className={`popup-heading ${popularClassNameStyling}`}>
                  Popular
                </li>
              </Link>
            </ul>
          </div>
          <div className="search-container">
            {this.renderSearchInput()}
            <Link to="/Account">
              <img
                src="https://res.cloudinary.com/dyx9u0bif/image/upload/v1657426927/account-avatar_irmhck.png"
                className={`nav-avatar ${accountClassNameStyling}`}
                alt="profile"
              />
            </Link>
            <MdMenuOpen
              size={25}
              color="white"
              className="menu-icon"
              onClick={this.onClickShowMenu}
            />
          </div>
        </div>
        {showMenu && (
          <div>
            <ul className="list-mini">
              <Link to="/" className="nav-link">
                <li className={`popup-heading ${homeClassNameStyling}`}>
                  Home
                </li>
              </Link>
              <Link to="/popular" className="nav-link">
                <li className={`popup-heading ${popularClassNameStyling}`}>
                  Popular
                </li>
              </Link>

              <Link to="/account" className="nav-link">
                <li className={`popup-heading ${accountClassNameStyling}`}>
                  Account
                </li>
              </Link>
              <ImCross
                size={10}
                color="#ffffff"
                onClick={this.onClickHideMenu}
                className="icon"
              />
            </ul>
          </div>
        )}
      </nav>
    )
  }

  render() {
    return this.renderHeader()
  }
}
export default withRouter(Header)
