import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
  const position: [number, number] = [12.9716, 77.5946]; // Example coordinates

  return (
    <MapContainer
      center={position}
      zoom={15}
      style={{
        height: "100%",
        width: "100%",
        filter: "invert(80%) hue-rotate(120deg)", // Makes it look more hacker-style
      }}
      className="glowing-border"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position}>
        <Popup>Drone Location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
