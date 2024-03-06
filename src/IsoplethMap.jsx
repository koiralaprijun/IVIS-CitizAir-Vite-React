import React, { useEffect, useState } from "react"
import mapboxgl from "mapbox-gl"

import "../src/css/IsoplethMap.css"

const IsoplethMap = ({ selectedDay }) => {
  const [map, setMap] = useState(null)

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoia3ByaWp1biIsImEiOiJjajd4OHVweTYzb2l1MndvMzlvdm90c2ltIn0.J25C2fbC1KpcqIRglAh4sA" //Mapbox access token
    const mapInstance = new mapboxgl.Map({
      container: "map-container",
      style: "mapbox://styles/kprijun/clsns5ahr006g01pkfe183e2m",
      center: [18.0686, 59.3293], // Stockholm City
      zoom: 13
    })

    setMap(mapInstance)

    // Cleanup function
    return () => {
      mapInstance.remove()
    }
  }, [])

  useEffect(() => {
    if (map && selectedDay) {
      map.loadImage(
        `../src/raster-image/aqi_daily/aqi_${selectedDay}.png`,
        (error, image) => {
          if (error) throw error

          // Remove the existing layer if it exists
          if (map.getSource("overlay")) {
            map.removeLayer("overlay")
            map.removeSource("overlay")
            map.removeImage("overlay")
          }

          map.addImage("overlay", image)

          map.addSource("overlay", {
            type: "image",
            url: `../src/raster-image/aqi_daily/aqi_${selectedDay}.png`,
            coordinates: [
              [17.732179, 59.522258],
              [18.348042, 59.522258],
              [18.348042, 59.208266],
              [17.732179, 59.208266]
            ]
          })

          map.addLayer({
            id: "overlay",
            type: "raster",
            source: "overlay",
            paint: {
              "raster-opacity": 0.75
            }
          })
        }
      )
    }
  }, [map, selectedDay])

  return <div id="map-container" />
}

export default IsoplethMap
