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

  handleClick(){
    var user = firebase.auth().currentUser;
    if (user) {
      var markerData = this.props.markerData;
      console.log("markerData in handle Click " + markerData);
      markerData.map(this.storeMarker);
    } else {
      alert("Cannot Perform Database Update... Please Sign in with an Authorizes Google Account");
    };
  },
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
  // DISPLAY TRACK that reads straight from prop
  displayTrack(){
    console.log('');
    var firebaseData = this.props.firebaseData;
    // console.log('firebaseData in displayTrack: ' + JSON.stringify(firebaseData));
    return firebaseData.map(this.createMarker);
  },
  createMarker(latLongData){
    // console.log('LAT/LONG data in createMarker: ' + JSON.stringify(latLongData));
    return <Marker 
      key={latLongData.key} 
      lat={latLongData.latitude} 
      lng={latLongData.longitude}
      onClick={this.onMarkerClick}/>;
  },

  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: true
    });
  },
 
  onDragEnd(e) {
    console.log('onDragEnd', e);
  },
 
  onCloseClick() {
    console.log('onCloseClick');
  },
 
  onClick(e) {
    console.log('onClick', e);
  },
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
    var database = firebase.database();

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