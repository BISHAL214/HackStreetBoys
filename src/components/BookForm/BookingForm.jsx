import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";

const BookingForm = ({ onPlaceSelected }) => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState([]);
  const [isPickupSuggestionOpen, setIsPickupSuggestionOpen] = useState(false);
  const [isDropoffSuggestionOpen, setIsDropoffSuggestionOpen] = useState(false);



  const fetchPlaceSuggestions = async (input, type) => {
    try {
      const response = await axios.get(
        `/api/place/autocomplete/json?input=${input}&key=${
          import.meta.env.VITE_MAP_API_KEY
        }`
      );
      const predictions = response.data.predictions.map(prediction => ({
        ...prediction,
        permanently_closed: prediction.business_status === "CLOSED_PERMANENTLY"
      }));
      if (type === "pickup") {
        setPickupSuggestions(predictions);
      } else {
        setDropoffSuggestions(predictions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectPickUp = async (placeId) => {
    try {
      const response = await axios.get(
        `/api/place/details/json?place_id=${placeId}&key=${
          import.meta.env.VITE_MAP_API_KEY
        }`
      );
      const location = response.data.result.geometry.location;
      console.log(location)
      setPickupLocation(response.data.result.formatted_address);
      onPlaceSelected(location, "pickup");
    } catch (error) {
      console.log("Error selecting pickup location", error);
    }
  };

  const handleSelectDropOff = async (placeId) => {
    try {
      const response = await axios.get(
        `/api/place/details/json?place_id=${placeId}&key=${
          import.meta.env.VITE_MAP_API_KEY
        }`
      );
      const location = response.data.result.geometry.location;
      setDropoffLocation(response.data.result.formatted_address);
      onPlaceSelected(location, "dropoff");
    } catch (error) {
      console.log("Error selecting dropoff location", error);
    }
  };



  const pickupSuggestionDisplay = isPickupSuggestionOpen ? "block" : "hidden";
  const dropoffSuggestionDisplay = isDropoffSuggestionOpen ? "block" : "hidden";
  return (
    <Form
      style={{
        padding: "20px",
        border: "2px solid #F3F3F3",
        display: "flex",
        flexDirection: "column",
        width: "20%",
        gap: "15px",
      }}
    >
      <span>Book Ambulance</span>
      <Input
        value={pickupLocation}
        onChange={(e) => {
          setPickupLocation(e.target.value);
          setIsPickupSuggestionOpen(true)
          fetchPlaceSuggestions(e.target.value, "pickup");
        }}
        placeholder="Pickup Location"
        style={{ height: "40px" }}
      />
      <div className={`flex flex-col  gap-3 ${pickupSuggestionDisplay} overflow-scroll`}>
        {pickupSuggestions.map((suggestion) => {
          return (
            <div
              key={suggestion?.place_id}
              className=" cursor-pointer bg-white"
              onClick={() => {
                handleSelectPickUp(suggestion?.place_id)
                setIsPickupSuggestionOpen(false)
              }}
            >
              {suggestion?.description}
            </div>
          );
        })}
      </div>
      <Input
        value={dropoffLocation}
        onChange={(e) => {
          setDropoffLocation(e.target.value);
          setIsDropoffSuggestionOpen(true)
          fetchPlaceSuggestions(e.target.value, "dropoff")
        }}
        placeholder="Dropoff Hospital"
        style={{ height: "40px" }}
      />
      <div className={`flex flex-col gap-3 ${dropoffSuggestionDisplay}`}>
        {dropoffSuggestions.map((suggestion) => {
          return (
            <div
              key={suggestion?.place_id}
              className=" cursor-pointer bg-white"
              onClick={() => {
                handleSelectDropOff(suggestion?.place_id)
                setIsDropoffSuggestionOpen(false)
              }}
            >
              {suggestion?.description}
            </div>
          );
        })}
      </div>
      <Button>Search</Button>
    </Form>
  );
};

export default BookingForm;
