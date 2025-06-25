import { GoogleMap, Marker, Circle, useJsApiLoader } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../features/hooks';
import { switchNearby, editRadius } from '../features/mapFeatureSlice';
import markerImg from '../assets/location.png'

const containerStyle = {
  width: '100%',
  height: '400px',
};

const circleStyle = {
  fillColor: "#00BFFF",
  fillOpacity: 0.2,
  strokeColor: "#1E90FF",
  strokeOpacity: 0.6,
  strokeWeight: 2,
}

const markerCircleStyle = {
  fillColor: "#FF0000",        
  fillOpacity: 0.35,         
  strokeColor: "#FF0044",    
  strokeOpacity: 0.8,
  strokeWeight: 2,
  clickable: false,           
  zIndex: 1,             
};


export default function MapComponent() {

  const isNearby = useAppSelector((state) => state.isNearby);
  const radius = useAppSelector((state) => state.radius);
  const dispatch = useAppDispatch()
  const [customMarker, setCustomMarker] = useState<google.maps.LatLngLiteral | null>(null);
 
  const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
              const { latitude, longitude } = position.coords;
              // console.log({latitude, longitude})
              setUserLocation({lat:latitude, lng:longitude})
          },
          (error) => {
              console.error('Error getting user location:', error);
          }
      );
    }
    else {
        console.error('Geolocation is not supported by this browser.');
    }
  }

  const handleMarkerEvent = (e : google.maps.MapMouseEvent) => {
    const lat = e.latLng?.lat();
    const lng = e.latLng?.lng();
    if (lat !== undefined && lng !== undefined) {
      const position = { lat, lng };
      setCustomMarker(position);
      console.log("Marker placed at:", position);
    }
  }

  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);

  useEffect(() => {
    getLocation()
  },[])


  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API,
  });


  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle}
     center={userLocation as google.maps.LatLngLiteral}
      zoom={14}
      onClick={(e) => handleMarkerEvent(e)}>
      <Marker position={userLocation as google.maps.LatLngLiteral} />
      {isNearby && (
        <Circle
          center={userLocation as google.maps.LatLngLiteral}
          radius={radius}
          options={circleStyle}
        />
      )}

        {customMarker && (
          <>
            <Marker
              position={customMarker}
              icon={{
                url: markerImg,
                scaledSize: new google.maps.Size(40, 40),
              }}
            />
            <Circle
              center={customMarker}
              radius={radius}
              options={markerCircleStyle}
            />
          </>
        )}


    </GoogleMap>
  ) : (
    <p>Loading Map...</p>
  );
}
