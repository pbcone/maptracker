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
  googleLogin(){
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token.
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
  greeting(props) {
    if (props) {
      // console.log('logged in');
      var buttonStyle = {
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
          <button style={buttonStyle} id="sign-out" onClick={this.googleSignOut}>
            Sign-out 
          </button>
          
        </div>
        );  
  }else{
      // console.log('logged out');
      var buttonStyle = {
          padding: '5px',
          margin:'0 0 0 15px ',
          borderRadius: '5px',
          backgroundColor: 'green',
          fontSize: '12pt',
        };
      return (
        <div>
          <button style= {buttonStyle} id="sign-in" onClick={this.googleLogin}>
          Sign-in with Google
          </button>
          <UserLoggedOut/>
        </div>);
    }
  },
  googleSignOut(){
    firebase.auth().signOut();
    this.setState({                
      userName: null,
      userPicture: null,
    });
    location.reload();
  },
  componentWillMount(){
    {this.checkUserLoggedIn()}
  },
  render(){
    return(
      <div>
        
        {/*TODO: make a login confrimation header*/}
        {/*TODO: initate page reload on login*/}
        {/*<UserLoggedIn userName={this.state.userName} userPicture={this.state.userPicture}/>*/}
        
        {console.log('username: ', this.state.userName)}
        {this.greeting(this.state.userName)}
      </div>
    );
  }
});



export default UserAuth;

