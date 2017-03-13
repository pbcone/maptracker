import React from 'react';
// import Image from 'react-image';


var UserLoggedIn = React.createClass({


  	render() {
		var googleCard = {
			borderRadius: '3px',
			backgroundColor: '#fff',
			boxShadow: 'inset 1px 1px 0 rgba(0,0,0,.1),inset 0 -1px 0 rgba(0,0,0,.07)',
			border: '1px solid #d8d8d8',
			borderBottomWidth: '2px',
			borderTopWidth: '0',
			// verticalAlign: 'top',
			margin: '15px 15px 5px 15px',
			padding: '5px',
			textAlign: 'right',
			height: '75px',
		};
		var googleImg = {
			verticalAlign: 'middle',
			borderRadius: '9999px',
			width: '75px',
			height: '75px',
			float: 'right',
			margin: ' 0 10px',
		};
		var googleName = {
			fontFamily: 'Roboto, arial, sans-serif',
			color: 'rgb(38, 38, 38)',
			fontSize: '20pt',
			margin: '22px 5px',
		};
    	return (
    		<div style={googleCard}>
			  <img style={googleImg} src={this.props.userPicture}/>
              <p style={googleName}>
                  {this.props.userName} 
              </p>
	    	</div>
	    );
	}
});

module.exports = UserLoggedIn;
