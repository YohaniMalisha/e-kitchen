// src/pages/ShopsPage.tsx

import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import styled from "styled-components";

// Type definitions for Location and PMC
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

// Styled components for the Shops page
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin: 50px 0;
  color: ${colors.darkGreen};
`;

const PMCList = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: ${colors.lightGreen};
  border-radius: 8px;
`;

const PMCItem = styled.div`
  padding: 10px;
  margin-bottom: 15px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const PMCName = styled.h3`
  margin: 0;
  color: ${colors.darkGreen};
`;

const PMCDetails = styled.p`
  margin: 5px 0;
  color: ${colors.mediumGreen};
`;

const ShopsPage: React.FC = () => {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [nearestPMCs, setNearestPMCs] = useState<PMC[]>([]);

  useEffect(() => {
    // Get user's location (using geolocation)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          console.error("Geolocation not available");
        }
      );
    }
  }, []);

  // Calculate distance between two locations
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

  useEffect(() => {
    if (userLocation) {
      // Filter PMCs based on the distance from the user
      const nearbyPMCs = pmcData.filter((pmc) => {
        const distance = calculateDistance(userLocation, pmc.coordinates);
        return distance < 10; // Example: show PMCs within 10 km radius
      });
      setNearestPMCs(nearbyPMCs);
    }
  }, [userLocation]);

  return (
    <Container>
      <SectionTitle>Nearest Pickup Management Centers</SectionTitle>

      {/* Map Component */}
      <MapContainer>
        <LoadScript googleMapsApiKey="AIzaSyDH_UCJbrqeoq9AqEf7RuCvU-XgRYF-Ev8">
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
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
        </LoadScript>
      </MapContainer>

      {/* List of Nearest PMCs */}
      <PMCList>
        {nearestPMCs.map((pmc) => (
          <PMCItem key={pmc.id}>
            <PMCName>{pmc.name}</PMCName>
            <PMCDetails>{pmc.address}</PMCDetails>
            <PMCDetails>
              District: {pmc.district} | Division: {pmc.division}
            </PMCDetails>
          </PMCItem>
        ))}
      </PMCList>
    </Container>
  );
};

export default ShopsPage;
