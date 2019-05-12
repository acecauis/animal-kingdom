## Quoting from Blockstack documentation on the usefulness of blockstack javascript library:

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
\\ Configure a sign-in button
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

```
