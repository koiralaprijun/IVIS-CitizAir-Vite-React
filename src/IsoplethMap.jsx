import React, { useEffect, useState } from "react"
import mapboxgl from "mapbox-gl"
import MapLegend from "./MapLegend"

import "../src/css/IsoplethMap.css"

const IsoplethMap = ({ selectedDay, selectedMetric, isMobileScreen }) => {
  const [map, setMap] = useState(null)
  const [selectedLocation, setSelectedLocation] = useState(null)


  useEffect(() => {
    mapboxgl.accessToken = "pk.eyJ1Ijoia3ByaWp1biIsImEiOiJjajd4OHVweTYzb2l1MndvMzlvdm90c2ltIn0.J25C2fbC1KpcqIRglAh4sA"
    const mapInstance = new mapboxgl.Map({
      container: "map-container",
      style: "mapbox://styles/kprijun/clsns5ahr006g01pkfe183e2m",
      center: [18.0686, 59.3293], // Stockholm City
      zoom: 13,
      minZoom: 10.2
    })

    mapInstance.addControl(new mapboxgl.NavigationControl(), "bottom-right")

    setMap(mapInstance)

    // Cleanup function
    return () => {
      mapInstance.remove()
    }
  }, [])

  useEffect(
    () => {
      if (map && selectedDay && selectedMetric) {
        const imagePath = `./raster-image/${selectedMetric}_daily/${selectedMetric}_${selectedDay}.png`

        map.loadImage(imagePath, (error, image) => {
          if (error) {
            console.error("Failed to load image:", error)
            return
          }

          if (map.getSource("overlay")) {
            map.removeLayer("overlay")
            map.removeSource("overlay")
            map.removeImage("overlay")
          }

          map.addImage("overlay", image)

          map.addSource("overlay", {
            type: "image",
            url: imagePath,
            coordinates: [[17.732179, 59.522258], [18.348042, 59.522258], [18.348042, 59.208266], [17.732179, 59.208266]]
          })

          map.addLayer({
            id: "overlay",
            type: "raster",
            source: "overlay",
            paint: {
              "raster-opacity": 0.75
            }
          })
        })
      }
    },
    [map, selectedDay, selectedMetric, selectedLocation]
  )

  return (
    <div id="isopleth-map-container">
      <div id="map-container" />
      <div>
      {isMobileScreen && <MapLegend />}
      </div>
    </div>
  )
}

export default IsoplethMap
