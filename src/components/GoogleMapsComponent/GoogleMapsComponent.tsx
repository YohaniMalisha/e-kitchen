import React, { useEffect } from "react";


const GoogleMapsComponent: React.FC = () => {
  useEffect(() => {
   // Load Google Maps script
  }, []);

  return <div id="map" style={{ height: "400px", width: "100%" }}></div>;
};

export default GoogleMapsComponent;
