/* eslint import/no-webpack-loader-syntax: off */

import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";
import plantIcon from "./assets/plant-icon.webp";

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken =
  "pk.eyJ1IjoiZXZnZW5paWExIiwiYSI6ImNrbmw2cHNyYjBmZGQybnB1ODg1NXFpMGoifQ.4tIbmi9DFIWxVO2Mn37XNA";
let geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-73.56, 45.5],
      },
      properties: {
        title: "Mapbox",
        description: "Montreal",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-122.414, 37.776],
      },
      properties: {
        title: "Mapbox",
        description: "San Francisco, California",
      },
    },
  ],
};
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

    geojson.features.forEach((marker) => {
      // create a HTML element for each feature
      var el = document.createElement("div");
      el.className = "marker";

      // make a marker for each feature and add to the map
      console.log(marker.geometry.coordinates);
      new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(map);
    });
    return () => map.remove();
  }, []);

  //   var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
  //   mapboxClient.geocoding
  //     .forwardGeocode({
  //       query: "Montreal, Old Port",
  //       autocomplete: false,
  //       limit: 1,
  //     })
  //     .send()
  //     .then(function (response) {
  //       if (
  //         response &&
  //         response.body &&
  //         response.body.features &&
  //         response.body.features.length
  //       ) {
  //         var feature = response.body.features[0];

  //         var map = new mapboxgl.Map({
  //           container: "map",
  //           style: "mapbox://styles/mapbox/streets-v11",
  //           center: feature.center,
  //           zoom: 10,
  //         });

  //         // Create a marker and add it to the map.
  //         new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
  //       }
  //     });

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
  .marker {
    background-image: url(${plantIcon});
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
