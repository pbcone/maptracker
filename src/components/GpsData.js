import React from 'react';
import axios from 'axios';
import MapComponent from './MapComponent';
import * as firebase from 'firebase';

const GpsData = React.createClass({
    getInitialState : function(){
        return {
            gpsData: [],
            firebaseData: []
        };
},
	componentDidMount : function() {
        var array = [];
        firebase.database().ref("gpsMarkers/").on('value', function(snapshot) {
        // console.log("whole SNAP SHOT IS: " + JSON.stringify(snapshot.val()));
            snapshot.forEach(function(item){
                var itemVal = item.val();
                // console.log("snapshot print" + JSON.stringify(itemVal));
                array.push(itemVal);
                // console.log("snapshot print " + itemVal.key);  
            });
            // console.log('Creating FIREBASE data info array is : ' + JSON.stringify(array));
            this.setState({
                    firebaseData: array
            });
        }.bind(this));
        this.serverRequest =
            axios.get('https://api.findmespot.com/spot-main-web/consumer/rest-api/2.0/public/feed/0sWEYq23x7F9dtcE9UYHPdgia5jy5TXY0/message.json')
	        .then(function (response) {
                //   console.log('Component did mount GpsData ' + JSON.stringify(response));
                var messages = response.data.response.feedMessageResponse.messages.message;
                // console.log('messages in GpsData ' + JSON.stringify(messages[1]));
                var messageLength = messages.length;
                var markerArray = [];
                for (var x=0 ; x< messageLength ; x++){
                    var latLongKeyPair= [messages[x].latitude, messages[x].longitude, messages[x].unixTime, messages[x].dateTime, messages[x].altitude];
                    // console.log('X: ' + x + ' lat long pair:'+latLongKeyPair);
                    markerArray.push(latLongKeyPair);
                }
                this.setState({
                    gpsData: markerArray
                });
		}.bind(this))
		.catch(function (error) {
            console.log("ERROR MESSAGE: " + error);
		});
	},
    componentWillUnmount : function(){
        this.serverRequest.abort();
    },
    render() {
        return (
            // console.log("markerData in GPSDATA: "+ JSON.stringify(this.state.gpsData)),
            <MapComponent markerData={this.state.gpsData} firebaseData={this.state.firebaseData}/>
        )
    }
});
module.exports = GpsData;
