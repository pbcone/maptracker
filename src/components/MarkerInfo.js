import React from 'react';



var MarkerInfo = React.createClass({
	renderinfo(){
		var tableStyle = {
			margin: '0 0 0 15px',
		};
		if (this.props.lat != null && this.props.lng != null){
			return(
				<h2 style = {tableStyle}>
					Click a GPs marker above to display information<br></br>
					Latitude: {this.props.lat} <br></br>
					Longitude: {this.props.lng} <br></br>
				</h2>
			);
		}else{
			return(
				<h2 style = {tableStyle}>
					Click a GPs marker above to display information<br></br>
				</h2>
			);

		}
	},

  	render() {
    	return (
    		<div>
				{this.renderinfo()}
	    	</div>
	    );
	}
});

module.exports = MarkerInfo;
