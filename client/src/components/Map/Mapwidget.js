import React, { useRef, useEffect, useState } from "react";
import { Box } from "@mui/material";
var mapboxgl = require("mapbox-gl");

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const MapWidget = ({ location }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: location.coordinates,
      zoom: 6,
    });
    new mapboxgl.Marker().setLngLat(location.coordinates).addTo(map.current);
    const nav = new mapboxgl.NavigationControl();
    map.current.addControl(nav, "top-right");
  });

  return <Box ref={mapContainer} sx={{ height: "450px", width: "100%" }}></Box>;
};

export default MapWidget;
