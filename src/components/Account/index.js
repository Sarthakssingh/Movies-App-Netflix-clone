import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import AccountContext from '../../context/AccountContext'

import './index.css'

const Account = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <AccountContext.Consumer>
      {value => {
        const {username, password} = value
        console.log(value)

        return (
          <div className="account-container">
            <Header />
            <div className="account-details-container">
              <h1 className="account-heading">Account</h1>
              <hr className="hr-line" />
              <div className="member-details-container">
                <p className="membership-heading">Member ship</p>
                <div>
                  <p className="membership-email">{username}@gmail.com</p>
                  <p className="membership-password">
                    Password {'*'.repeat(password.length)}
                  </p>
                </div>
              </div>
              <hr className="hr-line" />
              <div className="membership-container">
                <p className="plan-details">Plan details</p>
                <p className="membership-premium">Premium</p>
                <p className="ultra-hd">Ultra HD</p>
              </div>
              <hr className="hr-line" />
              <div className="account-logout-container">
                <button
                  onClick={onClickLogout}
                  className="account-logout"
                  type="button"
                >
                  Logout
                </button>
              </div>
            </div>
            <Footer />
          </div>
        )
      }}
    </AccountContext.Consumer>
  )
}
export default Account
