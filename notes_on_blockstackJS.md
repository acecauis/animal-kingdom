# Quoting from Blockstack documentation on the usefulness of blockstack javascript library:

"Blockstack Javascript library is all a developer needs to create a DApp, as it
grants the application the ability to authenticate a Blockstack identity and to
read and write to the user's data stored in a Gaia hub."


## Notes from the blockstack.js Reference library:
### Describing the Blockstack Javascript Software Developer Kit (SDK)

Installing the library:

```javascript
npm install blockstack
```

## Application Quickstart

1.) Install ```blockstack.js``` with ```npm```
```javascript
npm install blockstack --save
```

2.) Import Blockstack into your project
```javascript
import * as blockstack from 'blockstack' 
```

3.) Configure a sign-in button
```javascript
document.getElementById('signin-button').addEventListener('click', function() {
    blockstack.redirectToSignIn()
})
```

4.) Configure a sign-out button
```javascript
document.getElementById('signout-button').addEventListener('click', function() {
    blockstack.signUserOut()
})
```

5.) Include the logic to load user data and to handle the authentication
    response
```javascript
function showProfile(profile) {
    var person = new blockstack.Person(profile)
    document.getElementById('heading-name').innerHTML = person.name()
    document.getElementById('avatar-image').setAttribute('src', person.avatarUrl())
    document.getElementById('section-1').style.display = 'none'
    document.getElementById('section-2').style.display = 'block'
}

if (blockstack.isUserSignedIn()) {
  const userData = blockstack.loadUserData()
    showProfile(userData.profile)
}   else if (blockstack.isSignInPending()) {
    blockstack.handlePendingSignIn()
    .then(userData => {
        showProfile(userData.profile)
    })
}
```

6.) Create a ```manifest.json``` file

Note:    Recall that the ```manifest.json``` file is used to set the main 
         variables for your blockstack application.
```json
{
    "name": "Hello, Blockstack",
    "start_url": "localhost:5000",
    "description": "A simple demo of Blockstack Auth",
    "icons": [{
        "src": "https://helloblockstack.com/icon-192x192.png",
        "sizes": "192x192",
        "type": "image/png"
    }]
}
```

Make sure your ```manifest.json``` file has appropriate CORS headers so that it
can be fetched via an http ```GET``` from any origin

7.) Serve your application DUDE!
