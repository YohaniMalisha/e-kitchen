// src/components/MapComponent.tsx

import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Define types for userLocation and PMC data
interface Location {
  lat: number;
  lng: number;
}

interface PMC {
  id: string;
  name: string;
  district: string;
  division: string;
  coordinates: Location;
  address: string;
}

// Color Palette
const colors = {
  lightGreen: "#A3B18A",
  mediumGreen: "#588157",
  darkGreen: "#345A40",
};

const MapComponent: React.FC<{ userLocation: Location | null }> = ({ userLocation }) => {
  const [nearestPMCs, setNearestPMCs] = useState<PMC[]>([]);

  // Mock data for Pickup Management Centers (PMCs)
  const pmcData: PMC[] = [
    {
      id: "CMB_CLB_001",
      name: "Colombo - Colombo",
      district: "Colombo",
      division: "Colombo",
      coordinates: { lat: 6.9271, lng: 79.8612 },
      address: "Colombo, Western Province",
    },
    {
      id: "GPH_GPH_001",
      name: "Gampaha - Gampaha",
      district: "Gampaha",
      division: "Gampaha",
      coordinates: { lat: 7.4355, lng: 80.0215 },
      address: "Gampaha, Western Province",
    },
    {
      id: "KLT_KLT_001",
      name: "Kalutara - Kalutara",
      district: "Kalutara",
      division: "Kalutara",
      coordinates: { lat: 6.5293, lng: 80.0338 },
      address: "Kalutara, Western Province",
    },
  ];

  // Calculate distance between two locations using the Haversine formula
  const calculateDistance = (user: Location, pmc: Location): number => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (pmc.lat - user.lat) * (Math.PI / 180);
    const dLng = (pmc.lng - user.lng) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(user.lat * (Math.PI / 180)) *
        Math.cos(pmc.lat * (Math.PI / 180)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };

  // Filter PMCs based on distance from the user
  useEffect(() => {
    if (userLocation) {
      const getNearestPMCs = () => {
        const nearbyPMCs = pmcData.filter((pmc) => {
          const distance = calculateDistance(userLocation, pmc.coordinates);
          return distance < 10; // example: show PMCs within 10 km radius
        });
        setNearestPMCs(nearbyPMCs);
      };
      getNearestPMCs();
    }
  }, [userLocation]);

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "400px" }}
        center={userLocation || { lat: 6.9271, lng: 79.8612 }} // Default to Colombo
        zoom={12}
      >
        {nearestPMCs.map((pmc) => (
          <Marker
            key={pmc.id}
            position={pmc.coordinates}
            label={pmc.name}
          />
        ))}
      </GoogleMap>

      <div>
        <h3>Nearest Pickup Centers</h3>
        {nearestPMCs.map((pmc) => (
          <div key={pmc.id}>
            <h4>{pmc.name}</h4>
            <p>{pmc.address}</p>
            <p>District: {pmc.district}</p>
            <p>Division: {pmc.division}</p>
          </div>
        ))}
      </div>
    </LoadScript>
  );
};

export default MapComponent;
