/* eslint import/no-webpack-loader-syntax: off */

import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken =
  "pk.eyJ1IjoiZXZnZW5paWExIiwiYSI6ImNrbmw2cHNyYjBmZGQybnB1ODg1NXFpMGoifQ.4tIbmi9DFIWxVO2Mn37XNA";

const Map = () => {
  const mapContainer = useRef();
  const [lng, setLng] = useState(-73.56);
  const [lat, setLat] = useState(45.5);
  const [zoom, setZoom] = useState(14);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    return () => map.remove();
  }, []);

  return (
    <Wrapper>
      <div className="map-container" ref={mapContainer} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .map-container {
    width: 100%;
    height: 300px;
  }
`;

export default Map;
