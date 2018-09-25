
import React from 'react';
import {Cacher} from 'services/Cacher';

 
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Circle
  } from "react-google-maps";
  

  function MapComponent(props){

    const coordinates = props.coordinates;
    // const {coordinates} = props;

    return (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={coordinates}
      center={coordinates}
    >
      <Circle
        radius={500}
        center={coordinates}
      />
    </GoogleMap>
    )
  }


// lat: 37.790344,
// lng: -122.392177


  function withGeoCode(WrappedComponent){
    return class extends React.Component {

      constructor(){
        
        super();

        this.cacher = new Cacher();

        this.state = {
          coordinates: {
            lat: 0,
            lng: 0
          }
        }
      }

      componentWillMount(){
        this.getGeoCodedLocation();
      }

      geoCodeLocation(location){
        const geocoder = new window.google.maps.Geocoder();

        return new Promise((resolve, reject) => {
          geocoder.geocode({address: location}, (result, status) => {
          
            if(status === 'OK'){
              const geometry = result[0].geometry.location;
              const coordinates = {lat: geometry.lat(), lng: geometry.lng()};              
              
              this.cacher.cacheValue(location, coordinates);
              resolve(coordinates);
            }else{
              reject('Some error so rejected.....')
            } 
          });
        });
      }

      getGeoCodedLocation(){
        const location = this.props.location;

        if(this.cacher.isValueCached(location)){ 
          this.setState({ coordinates: this.cacher.getCacheValue(location)});
        }else {
          this.geoCodeLocation(location).then(
            (coordinates) => {
              this.setState({ coordinates: coordinates});
            },
            (error) => {
              console.log(error);
            }
          );
        }
      }

      render(){        
        return(
          <WrappedComponent {...this.state} />
        )
      }
    }
  }

  export const MapWithGeoCode = withScriptjs(withGoogleMap(withGeoCode(MapComponent)));
