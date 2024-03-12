import React, { useEffect, useState } from "react"
import mapboxgl from "mapbox-gl"
import MapLegend from "./MapLegend"

import "../src/css/IsoplethMap.css"

const IsoplethMap = ({ selectedDay, selectedMetric, isMobileScreen, selectedLocation }) => {
  const [map, setMap] = useState(null)
  const [markerCoordinates, setMarkerCoordinates] = useState(null)

  useEffect(() => {
    mapboxgl.accessToken = "pk.eyJ1Ijoia3ByaWp1biIsImEiOiJjajd4OHVweTYzb2l1MndvMzlvdm90c2ltIn0.J25C2fbC1KpcqIRglAh4sA"
    const mapInstance = new mapboxgl.Map({
      container: "map-container",
      style: "mapbox://styles/kprijun/clsns5ahr006g01pkfe183e2m",
      center: [18.0686, 59.3293], // Stockholm City
      zoom: 13,
      minZoom: 10.2
    })

    mapInstance.addControl(new mapboxgl.NavigationControl(), "top-right")

    setMap(mapInstance)

    // Cleanup function
    return () => {
      mapInstance.remove()
    }
  }, [])

  useEffect(
    () => {
      let marker // Declare marker outside so it's accessible in the cleanup function

      if (map && selectedLocation) {
        const getAqiInfo = aqiValue => {
          if (aqiValue >= 0 && aqiValue <= 50) {
            return { text: "Good", color: "#C0E49A" }
          } else if (aqiValue <= 100) {
            return { text: "Moderate", color: "#FFFFB5" }
          } else if (aqiValue <= 150) {
            return { text: "Unhealthy for Sensitive Groups", color: "#f99049" }
          } else if (aqiValue <= 200) {
            return { text: "Unhealthy", color: "#f65e5f" }
          } else if (aqiValue <= 300) {
            return { text: "Very Unhealthy", color: "#a070b6" }
          } else {
            return { text: "Hazardous", color: "#a06a7b" }
          }
        }
        // Use getAqiInfo to get text and color based on AQI value
        const { text: aqiText, color: aqiColor } = getAqiInfo(selectedLocation.aqi)

        // Create a popup with dynamic content based on AQI
        const popupContent = `
        <div>
        <h3>${selectedLocation.name}</h3>
        <p>AQI: ${selectedLocation.aqi} - <span style="color: ${aqiColor};">${aqiText}</span></p>
      </div>`

        const popup = new mapboxgl.Popup({ offset: 25, className: "my-custom-popup" }).setHTML(popupContent).addTo(map)

        // Create a marker and add it to the map
        marker = new mapboxgl.Marker()
          .setLngLat([selectedLocation.lon, selectedLocation.lat])
          .setPopup(popup) // Sets the popup to appear on click; to show on hover, see below
          .addTo(map)

        // Optionally, center the map on the marker
        map.flyTo({
          center: [selectedLocation.lon, selectedLocation.lat],
          essential: true,
          zoom: 14
        })

        // Add event listeners for mouseenter and mouseleave
        const markerElement = marker.getElement()
        markerElement.addEventListener("mouseenter", () => popup.addTo(map))
        markerElement.addEventListener("mouseleave", () => popup.remove())
      }

      // Cleanup function to remove the marker and popup when the component unmounts or selectedLocation changes
      return () => {
        if (marker) {
          marker.remove() // This removes the marker from the map
        }
      }
    },
    [map, selectedLocation]
  ) // Depend on map and selectedLocation

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

  // This function should be inside your IsoplethMap component
  const handleSelectLocation = (lat, lng) => {
    setMarkerCoordinates({ lat, lng })
  }

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
