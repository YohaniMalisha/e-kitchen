// import { useEffect } from "react";

// export const useGoogleMaps = () => {
//   useEffect(() => {
//     loadGoogleMaps();
//   }, []);
// };

export const loadGoogleMaps = () => {
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDH_UCJbrqeoq9AqEf7RuCvU-XgRYF-Ev8&callback=initMap`;
  script.async = true;
  document.body.appendChild(script);
};

// export const initMap = () => {
//   const map = new window.google.maps.Map(
//     document.getElementById("map") as HTMLElement,
//     {
//       center: { lat: 51.5074, lng: -0.1278 }, // Example: London coordinates
//       zoom: 12,
//     }
//   );
// };
