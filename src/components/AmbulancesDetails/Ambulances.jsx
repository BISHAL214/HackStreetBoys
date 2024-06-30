import React from 'react';

const AmbulanceDetails = ({ ambulances }) => {
  return (
    <div>
      <h2>Available Ambulances</h2>
      <ul>
        {ambulances.map((ambulance) => (
          <li key={ambulance.id}>
            <strong>{ambulance.car}</strong> driven by {ambulance.driver}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AmbulanceDetails;
