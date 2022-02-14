import { useRef, useEffect } from "react";
import { Box } from "@mui/material";

var mapboxgl = require("mapbox-gl");

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const HomeMap = ({ campgrounds }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [21.8243, 39.0742],
      zoom: 2,
    });
    const nav = new mapboxgl.NavigationControl();
    map.current.addControl(nav, "top-right");
  });

  campgrounds.map((camp) => {
    new mapboxgl.Marker()
      .setLngLat(camp.location.coordinates)
      .addTo(map.current);
  });
  return <Box ref={mapContainer} sx={{ height: "350px", width: "100%" }}></Box>;
};

export default HomeMap;
