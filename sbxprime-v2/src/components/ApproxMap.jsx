import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* Airbnb-style approximate-location map.
   Deliberately privacy-preserving: muted Carto "Positron" tiles, a soft circle
   over the general area, NO marker and NO exact address. The centre is rounded
   to ~2 decimal places (~1km) and the circle radius is wide, so the precise
   building can't be identified from the map. Exact address is shared only with
   verified investors. */
export default function ApproxMap({ marker, className = "" }) {
  const ref = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!ref.current || mapRef.current) return;
    const [latRaw, lngRaw] = marker.split(",").map(Number);
    // round to ~2dp (~1.1km) so the centre is the district, not the door
    const lat = Math.round(latRaw * 100) / 100;
    const lng = Math.round(lngRaw * 100) / 100;

    const map = L.map(ref.current, {
      center: [lat, lng],
      zoom: 14,
      zoomControl: false,
      scrollWheelZoom: false,
      attributionControl: true,
      dragging: true,
      doubleClickZoom: false,
    });
    mapRef.current = map;

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      subdomains: "abcd",
      maxZoom: 16,
      minZoom: 12,
      attribution: '&copy; OpenStreetMap &copy; CARTO',
    }).addTo(map);

    // Airbnb-style approximate area — soft brand circle, no pin
    L.circle([lat, lng], {
      radius: 480,
      color: "#1FB462",
      weight: 1.5,
      opacity: 0.5,
      fillColor: "#1FB462",
      fillOpacity: 0.14,
    }).addTo(map);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [marker]);

  return <div ref={ref} className={className} aria-label="Approximate location" role="img" />;
}
