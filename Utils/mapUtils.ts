// import { useEffect } from "react";

// export const useGoogleMaps = () => {
//   useEffect(() => {
//     loadGoogleMaps();
//   }, []);
// };

// export const loadGoogleMaps = () => {
//   const script = document.createElement("script");
//   script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap`;
//   script.async = true;
//   script.defer = true;
//   document.head.appendChild(script);
// };

// export const initMap = () => {
//   const map = new window.google.maps.Map(
//     document.getElementById("map") as HTMLElement,
//     {
//       center: { lat: 51.5074, lng: -0.1278 }, // Example: London coordinates
//       zoom: 12,
//     }
//   );
// };
