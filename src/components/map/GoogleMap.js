
import React from 'react';

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
  } from "react-google-maps";
  

  function MapComponent(props){

    const coordinates = props.coordinates;
    // const {coordinates} = props;
    debugger;

    return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={coordinates}
      center={coordinates}
    >
      <Marker
        position={coordinates}
      />
    </GoogleMap>
    )
  }



  // this.state = {
  //   coordinates: {
  //     lat: 37.790344,
  //     lng: -122.392177
  //   }
  // }


  function withGeoCode(WrappedComponent){
    return class extends React.Component {

      constructor(){
        
        super();

        this.state = {
          coordinates: {
            lat: 0,
            lng: 0
          }
        }
      }

      componentWillMount(){
        this.geoCodeLocation();
      }

      geoCodeLocation(){
        const location = this.props.location;
        const geocoder = new window.google.maps.Geocoder();


        geocoder.geocode({address: location}, (result, status) => {
          
          if(status === 'OK'){
            const geometry = result[0].geometry.location;
            const coordinates = {lat: geometry.lat(), lng: geometry.lng()};

            debugger;

            this.setState({
              coordinates: coordinates
            })
          }

        });
      }

      render(){        
        return(
          <WrappedComponent {...this.state} />
        )
      }
    }
  }

  export const MapWithGeoCode = withScriptjs(withGoogleMap(withGeoCode(MapComponent)));
