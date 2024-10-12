import React, { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleClick = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            response = await axios.post(url, {
              long: longitude,
              lat: latitude
            })
          } catch (error) {
            console.log("error")
          }

          setLocation({ latitude, longitude });
          setErrorMessage(null); // Clear any previous error message
        },
        (error) => {
          setErrorMessage('Unable to retrieve location. Please try again.');
        }
      );
    } else {
      setErrorMessage('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <button
        onClick={handleClick}
        className="bg-red-500 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-opacity duration-200 active:opacity-70 focus:outline-none mb-4"
      >
        🚨 Emergency 🚨
      </button>

      {location && (
        <div className="text-center text-lg">
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      )}

      {errorMessage && (
        <div className="text-center text-red-500 text-lg mt-2">
          {errorMessage}
        </div>
      )}
    </div>
  );
}