import React from 'react';
import * as firebase from 'firebase';
import UserLoggedIn from './UserLoggedIn.js';
import UserLoggedOut from './UserLoggedOut.js';

var UserAuth = React.createClass({
 
  getInitialState : function(){
      return {
            userName: null,
            userPicture: null
          };
  },
  // googleLogin() handles the the authentication using a google profile. Once a user is loged in it will 
  //  set the logged in state to include the username and photo
  googleLogin(){
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider).then(function(result) {
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log("token: ",token);
    console.log("User: ", user);
    console.log(JSON.stringify(user.photoURL));
    this.setState({                
      userName: user.displayName,
      userPicture: user.photoURL,
    });
    location.reload();
    }.bind(this));
  },
  // checkUserLoggedIn() will manage state of the user name and picture as a user logs in and out of the app
  checkUserLoggedIn(){
    console.log('checking if user is signed in');
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          console.log('user Signed in: ', JSON.stringify(user.displayName));
          this.setState({                
            userName: user.displayName,
            userPicture: user.photoURL,
          });
        } else{
          this.setState({                
            userName: null,
            userPicture: null,
          });
        } 
    }.bind(this));
  },
  //greeting() provides the approperate greeting for a user based on if they are in a signed-in or 
  //  signed-out state
  greeting(props) {
    if (props) {
      // console.log('logged in');
      var signOutButtonStyle = {
          float: 'right',
          padding: '5px',
          margin:'0 15px 0 0',
          borderRadius: '5px',
          backgroundColor: 'red',
          fontSize: '12pt',
        };
      return( 
        <div>
          <UserLoggedIn userName={this.state.userName} userPicture={this.state.userPicture}/>
          <button style={signOutButtonStyle} id="sign-out" onClick={this.googleSignOut}>
            Sign-out 
          </button>
          
        </div>
        );  
  }else{
      // console.log('logged out');
      var signInButtonStyle = {
          padding: '5px',
          margin:'0 0 0 15px ',
          borderRadius: '5px',
          backgroundColor: 'green',
          fontSize: '12pt',
        };
      return (
        <div>
          <button style={signInButtonStyle} id="sign-in" onClick={this.googleLogin}>
          Sign-in with Google
          </button>
          <UserLoggedOut/>
        </div>);
    }
  },
  //googleSignout() is called when the signout button is clicked, and will log out the user
  googleSignOut(){
    firebase.auth().signOut();
    this.setState({                
      userName: null,
      userPicture: null,
    });
    location.reload();
  },
  componentWillMount(){
    this.checkUserLoggedIn();
  },
  render(){
    return(
      <div>
        {this.greeting(this.state.userName)}
      </div>
    );
  }
});

export default UserAuth;

