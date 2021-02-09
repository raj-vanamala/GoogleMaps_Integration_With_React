import { useEffect, useState } from 'react';
import { GoogleMap , withScriptjs , withGoogleMap, Marker,DirectionsRenderer } from 'react-google-maps';



function Map() {

    const [directions , setDirections] = useState('');
    const [origin] = useState({lat : 12.9716 , lng: 77.5946});
    const [destination] = useState({lat: 13.0827,lng: 80.2707});

    useEffect(()=> {
        loadMap();
    },[])


    async function loadMap() {

        
        const directionsService = new window.google.maps.DirectionsService();    
        
        directionsService.route({
            
            origin,
            destination,
            travelMode: window.google.maps.TravelMode.DRIVING,

          }, (result, status) => {
            
            console.log(status);
            
            if (status === window.google.maps.DirectionsStatus.OK) {
              setDirections(result);
            } else {
              alert("please check your values");
            }
          });
    }
    
    return (
        <GoogleMap
            defaultZoom={10}
            defaultCenter={{lat: 17.3850 ,lng: 78.4867}}
          >
          <Marker position={{lat: 17.3850 ,lng: 78.4867}}/>
          <Marker position={origin} />
          <Marker position={destination} />
          {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap> 
    )

}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function MapComponent() {

    const [mapKey] = useState('AIzaSyDZ-pwI-uYCL_1m8_1pVNsHNuP0X_oXxFo');

    return <div style={{height:"80vh",width : "50vw",padding:"20px",boxSizing:"border-box"}}>
        <WrappedMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?libraries=geometry,drawing,places&key=${mapKey}`}
            loadingElement={<div style={{ height: "100%" }} />}
            containerElement={<div style={{ height: "100%" }} />}
            mapElement={<div style={{ height: "100%" }} />}
        />
    </div> 
}
