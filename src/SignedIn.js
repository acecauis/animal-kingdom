// Many of these imports are locally coded React components -- see the rest of
// the .js files located in the 'src' folder

// Key Blockstack imports are the
// 'UserSession' and the
// 'appConfig' which is
// defined in the 'constants.js' file
import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { UserSession } from 'blockstack'
import EditMe from './EditMe'
import Kingdom from './Kingdom'
import NavBar from './NavBar'
import OptionsList from './OptionsList'
import OtherKingdoms from './OtherKingdoms'
import { appConfig, ME_FILENAME } from './constants'
import './SignedIn.css'


class SignedIn extends Component {

  // A constructor is a special type of subroutine called to create an object
  // A constructor prepares the new object for use, often accepting arguments
  // that the constructor uses to set required member variables

  // A constructor resembles an instance method, but it differes from a method
  // in that it has no explicit 'return type', it is not implicitly
  // inherited and it usually has different rules for scope modifiers

  // Constructors often have the same name as the declaring class.
  // They have the task of initializing the obkect's data members and of
  // establishing the invariant of the class, failing if the invariant
  // is invalid
  constructor(props) {
    super(props)
    this.userSession = new UserSession({ appConfig })
    this.state = {
      me: {},
      savingMe: false,
      savingKingdown: false,
      redirectToMe: false
    }

    this.loadMe = this.loadMe.bind(this)
    this.saveMe = this.saveMe.bind(this)
    this.signOut = this.signOut.bind(this)
  }

  componentWillMount() {
    this.loadMe()
  }

  // Gaia is the Blockstack data storage hub
  // Once a user authenticates, the application can get and put
  // application data in the user's data storage, and adter a user signs in
  // the 'SignedIn.js' code checks the user's Gaia profile by running the
  // 'loadMe()' method

  // the 'loadMe()' code uses the Blockstack's 'UserSession.getFile()' method
  // to get the specified file from the applications data store

  // If the user's data store on Gaia does not have the data, which is the case
  /// for new users, the Gaia hub responds with HTTP 404 code and 'getFile'
  // promise resolves to null
  loadMe() {
    const options = { decrypt: false }
    this.userSession.getFile(ME_FILENAME, options)
    .then((content) => {
      if(content) {
        const me = JSON.parse(content)
        this.setState({me, redirectToMe: false})
      } else {
        const me = null

        this.setState({me, redirectToMe: true})
      }
    })
  }

  // After a user chooses an animal persona and a territory, the user presses
  // 'Done' and the application stores the user data on Gaia
  saveMe(me) {
    this.setState({me, savingMe: true})
    const options = { encrypt: false }
    this.userSession.putFile(ME_FILENAME, JSON.stringify(me), options)
    .finally(() => {
      this.setState({savingMe: false})
    })
  }

  signOut(e) {
    e.preventDefault()
    this.userSession.signUserOut()
    window.location = '/'
  }

  render() {
    const username = this.userSession.loadUserData().username
    const me = this.state.me
    const redirectToMe = this.state.redirectToMe
    if(redirectToMe) {
      // User hasn't configured her animal
      if(window.location.pathname !== '/me') {
        return (
          <Redirect to="/me" />
        )
      }
    }

    if(window.location.pathname === '/') {
      return (
        <Redirect to={`/kingdom/${username}`} />
      )
    }


    return (
      <div className="SignedIn">
      <NavBar username={username} signOut={this.signOut}/>
      <Switch>
              <Route
                path='/animals'
                render={
                  routeProps => <OptionsList
                  type="animals"
                  {...routeProps} />
                }
              />
              <Route
                path='/territories'
                render={
                  routeProps => <OptionsList
                  type="territories"
                  {...routeProps} />
                }
              />
              <Route
                path='/others'
                render={
                  routeProps => <OtherKingdoms
                  type="territories"
                  {...routeProps} />
                }
              />
              <Route
                path='/me'
                render={
                  routeProps => <EditMe
                  me={me}
                  saveMe={this.saveMe}
                  username={username}
                  {...routeProps} />
                }
              />
              <Route
                path={`/kingdom/${username}`}
                render={
                  routeProps => <Kingdom
                  myKingdom={true}
                  protocol={window.location.protocol}
                  ruler={username}
                  currentUsername={username}
                  realm={window.location.origin.split('//')[1]}
                  {...routeProps} />
                }
              />
              <Route
                path='/kingdom/:protocol/:realm/:ruler'
                render={
                  routeProps => <Kingdom
                  myKingdom={false}
                  protocol={routeProps.match.params.protocol}
                  realm={routeProps.match.params.realm}
                  ruler={routeProps.match.params.ruler}
                  currentUsername={username}
                  {...routeProps} />
                }
              />
      </Switch>
      </div>
    );
  }
}

export default SignedIn
