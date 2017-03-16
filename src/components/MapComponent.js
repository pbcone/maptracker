import '../App.css';
import React from 'react';
import {Gmaps, Marker} from 'react-gmaps';
import * as firebase from 'firebase';
import MarkerInfo from './MarkerInfo.js';

//Marker Data= Data from API call
//FirebaseData = data stored in database 
var MapComponent = React.createClass({
  getInitialState : function(){
    return {
      latitude: 44.052071,
      longitude: -123.086653,
      markerLat: 0.0,
      markerLng: 999,
      dbData:[],
      infoLat: null,
      infoLng: null  
    };
  },

  //handleClick() is the function that is called to perform Database update with new data from the api call
  handleClick(){
    var user = firebase.auth().currentUser;
    if (user) {
      var markerData = this.props.markerData;
      // console.log("markerData in handle Click " + markerData);
      markerData.map(this.storeMarker);
    }else {
      alert("Cannot Perform Database Update... Please Sign in with an Authorizes Google Account");
    };
  },

  //storeMarker() is a function to add an individual Marker JSON object into the specified database
  storeMarker(markerData){
    console.log(markerData);
    var markerKey =  markerData[2].toString();
    var date = markerData[3].split('T')[0];
    var time = markerData[3].split('T')[1];
    console.log(markerKey);
    var gpsMarkers = firebase.database().ref("gpsMarkers/" + markerKey);
    gpsMarkers.update({
          key: markerKey,
          latitude: markerData[0], 
          longitude: markerData[1],
          date: date,
          time: time,
          altitude: markerData[4]
    });
    console.log("finished storing");
  },

  //displayTrack() reads straight from the MapComponent property and displays the GPS markers on the map
  //  This property is set by the information that is stored in the Database
  displayTrack(){
    console.log('');
    var firebaseData = this.props.firebaseData;
    // console.log('firebaseData in displayTrack: ' + JSON.stringify(firebaseData));
    return firebaseData.map(this.createMarker);
  },
  //createMarker() returns a marker object when passed a json object with the following keys 
  //  {("key": " "),("latitude":""),("longitude":"")}
  createMarker(latLongData){
    // console.log('LAT/LONG data in createMarker: ' + JSON.stringify(latLongData));
    return <Marker 
      key={latLongData.key} 
      lat={latLongData.latitude} 
      lng={latLongData.longitude}
      onClick={this.onMarkerClick}/>;
  },
  // this is a Base function that is part of the Google maps implementation, not created by me
  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: true
    });
  },
  // this is a Base function that is part of the Google maps implementation, not created by me
  onDragEnd(e) {
    console.log('onDragEnd', e);
  },
  // this is a Base function that is part of the Google maps implementation, not created by me
  onCloseClick() {
    console.log('onCloseClick');
  },
  // this is a Base function that is part of the Google maps implementation, not created by me
  onClick(e) {
    console.log('onClick', e);
  },
  //onMarkerClick() is a function that when a marker is clicked it will change the state to 
  //  be the longitude and latitude of the marker that way clicked. This change of state will
  //  result in a change in the markerInfo component
  onMarkerClick(e) {
    var cords = e.latLng;
    console.log("e is: ", e);
    console.log("cords is : ", JSON.stringify(cords));
    // console.log(cords.lat(cords));
    this.setState({                
      infoLat: cords.lat(cords),
      infoLng: cords.lng(cords),
    });
  },
  render() {
    var buttonStyle = {
      padding: '5px',
      margin:'0 0 15px 15px',
      borderRadius: '5px',
      backgroundColor: 'Orange',
      fontSize: '12pt',
    };
    var gmapStyle = {
      margin: 'auto',
    };
    return (
      <div>
        <button style={buttonStyle} onClick={this.handleClick}>Click To Update Database</button>
        <Gmaps
          style={gmapStyle}
          width={'800px'}
          height={'600px'}
          lat={this.state.latitude}
          lng={this.state.longitude}
          zoom={12}
          loadingMessage={'Be happy'}
          params={{v: '3.exp'}}
          onMapCreated={this.onMapCreated}>
          {this.displayTrack()}
        </Gmaps >
        <MarkerInfo 
          lat={this.state.infoLat} 
          lng={this.state.infoLng} />
      </div>
    );
  }
});

module.exports = MapComponent;