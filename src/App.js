import React from 'react';
import UserAuth from './components/userAuth';
// import MapComponent from './components/MapComponent';
import GpsData from './components/GpsData';
import * as firebase from 'firebase';


var config = {
    apiKey: "AIzaSyCYCVmNur71OGrXAgTgck6qBZ42-BSfvg4",
    authDomain: "maptracker-f38e1.firebaseapp.com",
    databaseURL: "https://maptracker-f38e1.firebaseio.com",
    storageBucket: "maptracker-f38e1.appspot.com",
    messagingSenderId: "217070872177"
};
firebase.initializeApp(config);



var App = React.createClass({
	
  	render() {
		var masterDivStyle ={
			padding: '15px',
			maxWidth: '830px',
			background: 'gray'
		};
		
    	return (
    		<div style={masterDivStyle}>
	          	<UserAuth/>
	          	<GpsData/>
	    	</div>
	    );
	}
});

module.exports = App;
