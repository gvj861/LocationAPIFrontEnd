import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker  } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};


class MapLocator extends Component {
    constructor() {
      super();
      this.state = {
        name: "New Delhi"
      };
    }
  
    render() {
      return (
        <div>

          <Map
            google={this.props.google}
            zoom={13}
            style={mapStyles}
            center={{
              lat: sessionStorage.getItem("latitude"),
              lng:sessionStorage.getItem("longitude")
            }}
          
          >
           <Marker
            onClick={this.onMarkerClick}
            position = {{
              lat : sessionStorage.getItem("latitude"),
              lng : sessionStorage.getItem("longitude")
            }}
            name={sessionStorage.getItem("location")}
          />
          </Map>
        </div>
      );
    }
  }
  
  export default GoogleApiWrapper({
    apiKey: 'AIzaSyD5aaUC04aTctYFTYLCLG40MQJTNWdzt0E'
  })(MapLocator);