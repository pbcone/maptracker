import React from 'react';

//UserLoggedOut is the component that is called when the user is not logged in
var UserLoggedOut = React.createClass({
	render() {
		var pStyle ={
			fontSize: '14pt',
		};
		var divStyle = {
			margin: '5px 15px'
		};
		return (
			<div style={divStyle}>
				<p style={pStyle}>
					Welcome to my React Project. This App will store the GPS points collected by Matti's <i>FindmeSpot</i> and display them on the Map below. Please Log in using a Google account
				</p>
				<p>
					<a href="http://www.findmespot.com/en/">Findme Spot</a>, provides a subscription based tracking services with an API that will retrieve the previous 7 days of tracking information
				</p>
				<p>
					This app will allow external storage of the data provided by the API as well as displaying the recieved information
				</p> 
			</div>
		);
	}
});

module.exports = UserLoggedOut;