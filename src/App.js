import React, { Component } from 'react'
import './App.css'

// Creating a 'UserSession' and using that session's 'isUserSignedIn()' method
// to determine if the user is signed in or out of the application
import { UserSession } from 'blockstack'

// Depending on the result of this method, the aplication redirects to the
// 'src/SignedIn' page or to the 'src/Landing.js' page
import Landing from './Landing'
import SignedIn from './SignedIn'

class App extends Component {

  constructor() {
    super()
    this.userSession = new UserSession()
  }

  componentWillMount() {
    const session = this.userSession

    // The first time you start the application, this code determines if the
    // user has signed into the DApp previously, and if not, it opent the
    // 'Landing.js' page.
    // This page offers the user an opportuntity to 'Sign in to Blockstack'
    if(!session.isUserSignedIn() && session.isSignInPending()) {
      session.handlePendingSignIn()
      .then((userData) => {
        if(!userData.username) {
          throw new Error('This app requires a username.')
        }
        window.location = `/kingdom/${userData.username}`
      })
    }
  }

  // Clicking the button ends up calling the 'redirectToSignIn()' method which
  // generates an authentication request and redirects the user to the
  // Blockstack Browser to approve the sign in request.

  // The actual Blockstack sign-in dialog depends on whether the user already
  // has an existing session in the Blockstack Browser

  // Signing in with an identity is the means by which the user grants the DApp
  // access

  // Access means the DApp can read the user profile and read/write user data
  // for the DApp

  // Data is encrypted at a unique URL on a Gaia storage hub

  // The source code imports 'UserSession' from the Blockstack libary
  // Data related to a given user-session is encapsulated in the session

  // In a web browser, 'UserSession' default behaviour is to store session data
  // in the browser's local storage

  // This means that app developers can leave management of session state to
  // the users.

  // In a non-web browser environemnt, it is necessary to pass in an instance
  // of ```AppConfig``` which defines the parameters of the current app
  render() {
    return (
      <main role="main">
          {this.userSession.isUserSignedIn() ?
            <SignedIn />
          :
            <Landing />
          }
      </main>
    );
  }
}

export default App
