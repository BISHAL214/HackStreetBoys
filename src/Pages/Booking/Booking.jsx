import React, { useEffect, useState } from 'react'
import Map from '../../components/MapContainer/Map'
import Wrapper from "../../components/Wrapper/Wrapper"
import BookingForm from '../../components/BookForm/BookingForm'
const Booking = () => {

    const [pickupCoordinates, setPickupCoordinates] = useState(null);
    const [dropoffCoordinates, setDropoffCoordinates] = useState(null);

  
    const handlePlaceSelected = (latLng, type) => {
      if (type === "pickup") {
        setPickupCoordinates(latLng);
      } else {
        setDropoffCoordinates(latLng);
      }
    };

  return (
    <Wrapper className=" flex-row gap-10">
        <BookingForm onPlaceSelected={handlePlaceSelected} />
        <Map pickupLocation={pickupCoordinates} dropoffLocation={dropoffCoordinates}/>
    </Wrapper>
  )
}

export default Booking
