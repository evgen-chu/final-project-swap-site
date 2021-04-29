/* eslint import/no-webpack-loader-syntax: off */

import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";
import plantIcon2 from "./assets/plant2c2.svg";

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken =
  "pk.eyJ1IjoiZXZnZW5paWExIiwiYSI6ImNrbmw2cHNyYjBmZGQybnB1ODg1NXFpMGoifQ.4tIbmi9DFIWxVO2Mn37XNA";
const Map = ({
  form,
  setForm,
  itemAdded,
  setItemAdded,
  itemLat,
  itemLng,
  items,
}) => {
  const location = useLocation();
  const mapContainer = useRef();
  const [lng, setLng] = useState(itemLng || -73.56);
  const [lat, setLat] = useState(itemLat || 45.5);
  const [zoom, setZoom] = useState(10);
  const [chosenLat, setChosenLat] = useState(null);
  const [chosenLon, setChosenLon] = useState(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    const createMarker = (e) => {
      var el = document.createElement("div");
      el.className = "marker";

      console.log("coords: " + JSON.stringify(e.lngLat.wrap()));
      setChosenLat(e.lngLat.lat);
      setChosenLon(e.lngLat.lng);

      new mapboxgl.Marker(el)
        .setLngLat([e.lngLat.lng, e.lngLat.lat])
        .addTo(map);
    };
    if (itemLat && itemLng) {
      var el = document.createElement("div");
      el.className = "marker";
      new mapboxgl.Marker(el).setLngLat([itemLng, itemLat]).addTo(map);
    }
    if (location.pathname.includes("profile")) {
      map.on("click", createMarker);
    } else {
      map.off("click", createMarker);
    }
    if (items) {
      items.forEach((item) => {
        // create a HTML element for each feature
        var el = document.createElement("div");
        el.className = "marker";

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
          .setLngLat([item.location_lng, item.location_lat])
          .addTo(map);
      });
    }

    return () => map.remove();
  }, []);

  const handleClick = (e) => {
    setForm({
      ...form,
      location_lat: chosenLat,
      location_lng: chosenLon,
    });
    setItemAdded(!itemAdded);
  };

  return (
    <Wrapper>
      <div className="map-container" ref={mapContainer} onClick={handleClick} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: static;
  z-index: 10;
  width: 100%;
  height: 100%;
  .map-container {
    width: 100%;
    height: 300px;
  }
  .marker {
    background-image: url(${plantIcon2});
    background-size: cover;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
  }
  .mapboxgl-popup {
    max-width: 200px;
  }

  .mapboxgl-popup-content {
    text-align: center;
    font-family: "Open Sans", sans-serif;
  }
`;

export default Map;
