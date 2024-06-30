import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { Polyline } from "@react-google-maps/api";
import Ambulances from "../AmbulancesDetails/Ambulances";
// import { handleGetLiveLocations } from "../../store/Slices/serverSlice.js";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { Spin } from "antd";
import axios from "axios";

const mapStyles = {
  width: "100%",
  height: "100%",
};

const socket = io("http://localhost:5000");

const MapContainer = ({ google, pickupLocation, dropoffLocation }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [ambulances] = useState([
    {
      id: 1,
      lat: 22.653564,
      lng: 88.4450847,
      driver: "John Doe",
      car: "Ambulance A",
    },
    {
      id: 2,
      lat: 37.7849,
      lng: 88.4450902,
      driver: "Jane Smith",
      car: "Ambulance B",
    },
  ]);

  const [directions, setDirections] = useState(null);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [mapInstance, setMapInstance] = useState(null);

  const [distance, setDistance] = useState(null);
  const [time, setTime] = useState(null);
  const serverState = useSelector((state) => state.server);

  const dispatch = useDispatch();

  const [path, setPath] = useState(null);
  const [position, setPosition] = useState({ lat: 51.505, lng: -0.09 });

  useEffect(() => {
    if (google) {
      fetchHospitals();
    }
  }, [pickupLocation]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setCurrentLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  useEffect(() => {
    if (pickupLocation) {
      setCenter({ lat: pickupLocation?.lat, lng: pickupLocation?.lng });
    } else if (currentLocation) {
      setCenter(currentLocation);
    }
  }, [pickupLocation, currentLocation]);

  useEffect(() => {
    if (pickupLocation && dropoffLocation && mapInstance) {
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(pickupLocation);
      bounds.extend(dropoffLocation);
      mapInstance.fitBounds(bounds);
    }
  }, [pickupLocation, dropoffLocation, mapInstance]);

  useEffect(() => {
    handleRoute();
  }, [pickupLocation, dropoffLocation]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:500/api/coordinates")
  //     .then((response) => {
  //       const respondPath = response?.data?.map((coord) => {
  //         lat: coord?.latitude;
  //         lng: coord?.longitude;
  //       });
  //       setPath(respondPath);
  //     })
  //     .catch((err) => console.log(err.message));

  //   socket.on("new_coordinates", (data) => {
  //     const newPosition = { lat: data.latitude, lng: data.longitude };
  //     setPosition({ lat: data.latitude, lng: data.longitude });
  //     setPath((prevPath) => {
  //       const newPath = [...prevPath, newPosition];
  //       return newPath;
  //     });
  //   });

  //   return () => socket.disconnect();
  // }, []);

  // useEffect(() => {
  //   dispatch(handleGetLiveLocations())

  //   socket.on('new_coordinates', (data) => {
  //     dispatch(handleGetLiveLocations())
  //   })
  //   return () => {
  //     socket.off("new_coordinates")
  //   }
  // }, [dispatch])

  // useEffect(() => {
  //   console.log(serverState?.data)
  // }, [serverState?.data])

  const fetchHospitals = () => {
    const service = new google.maps.places.PlacesService(
      new google.maps.Map(document.createElement("div"))
    );
    const request = {
      location: pickupLocation
        ? new google.maps.LatLng(pickupLocation?.lat, pickupLocation?.lng)
        : new google.maps.LatLng(0, 0),
      radius: "5000",
      type: ["hospital"],
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const updatedResults = results.map((result) => ({
          ...result,
          business_status: result.business_status || "OPERATIONAL",
          utc_offset: result.utc_offset_minutes,
        }));
        setHospitals(updatedResults);
      }
    });
  };

  const handleRoute = () => {
    if (pickupLocation && dropoffLocation) {
      const directionsService = new google.maps.DirectionsService();

      directionsService.route(
        {
          origin: pickupLocation,
          destination: dropoffLocation,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);

            const route = result.routes[0];
            const legs = route.legs[0];
            const distance = legs.distance.text;
            const duration = legs.duration.text;

            setDistance(distance);
            setTime(duration);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  };

  const latlongs = directions?.routes[0]?.overview_path?.map((path) => {
    return { lat: path?.lat(), lng: path?.lng() };
  });

  const handleMapReady = (mapProps, map) => {
    setMapInstance(map);
  };

  if (!google) {
    return <Spin />;
  }

  return (
    <div className=" absolute w-[74%] h-[89%]">
      <Map
        google={google}
        zoom={13}
        style={mapStyles}
        center={center}
        onReady={handleMapReady}
      >
        {hospitals.map((hospital) => (
          <Marker
            key={hospital.place_id}
            position={{
              lat: hospital.geometry.location.lat(),
              lng: hospital.geometry.location.lng(),
            }}
            title={hospital.name}
            icon={{
              url: "/hospital.png",
              scaledSize: new google.maps.Size(30, 30),
            }}
          />
        ))}
        {ambulances.map((ambulance) => (
          <Marker
            key={ambulance.id}
            position={{ lat: ambulance.lat, lng: ambulance.lng }}
            title={`${ambulance.car} - ${ambulance.driver}`}
            icon={{
              url: "/ambulance.png",
              scaledSize: new google.maps.Size(32, 32),
            }}
          />
        ))}
        <Polyline
          path={latlongs}
          options={{
            strokeColor: "#040273",
            strokeOpacity: 1.0,
            strokeWeight: 5,
          }}
        />
        {/* {directions && <DirectionsRenderer directions={directions} />} */}
        {pickupLocation && <Marker position={pickupLocation} />}
        {dropoffLocation && <Marker position={dropoffLocation} />}
      </Map>
      {
        <div>
          
        </div>
      }
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: import.meta.env.VITE_MAP_API_KEY,
})(MapContainer);
