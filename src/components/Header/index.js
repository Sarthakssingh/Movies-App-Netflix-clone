import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'

import {HiOutlineSearch} from 'react-icons/hi'

import {MdMenuOpen} from 'react-icons/md'
import {ImCross} from 'react-icons/im'

import './index.css'

class Header extends Component {
  state = {
    showMenu: false,
    showSearchBar: false,
    searchInp: '',
  }

  onClickSearchIcon = () => {
    this.setState(prevState => ({
      showSearchBar: !prevState.showSearchBar,
    }))
  }

  onClickSearchInpIcon = () => {
    const {searchInput} = this.props
    const {searchInp} = this.state
    searchInput(searchInp)
  }

  onClickShowMenu = () => {
    this.setState({showMenu: true})
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

  render() {
    const {showMenu, showSearchBar} = this.state
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
      default:
        homeClassNameStyling = 'active'
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
            {showSearchBar && (
              <div className="search-input">
                <input
                  type="search"
                  onKeyDown={this.onChangeSearchInput}
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
                    testid="searchButton"
                    onClick={this.onClickSearchInpIcon}
                  />
                </button>
              </div>
            )}
            {!showSearchBar && (
              <Link to="/search">
                <button
                  type="button"
                  className="icon-button"
                  testid="searchButton"
                >
                  <HiOutlineSearch
                    className="search-btn"
                    size={20}
                    color="white"
                    testid="searchButton"
                    onClick={this.onClickSearchIcon}
                  />
                </button>
              </Link>
            )}
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
}
export default withRouter(Header)
