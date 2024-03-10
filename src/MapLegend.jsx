import "../src/css/MapLegend.css"
import { Tooltip } from "@chakra-ui/react"

const MapLegend = () => {
  const legendData = [
    { label: "No Data", color: "#2792C6" },
    { label: "Good", color: "#C0E49A" },
    { label: "Moderate", color: "#FFFFB5" },
    { label: "Unhealthy for sensitive groups", color: "#FCCF5C" },
    { label: "Unhealthy", color: "#FD8C3C" },
    { label: "Very unhealthy", color: "#B3840E" },
    { label: "Hazardous", color: "#E31C23" }
  ]

  return (
    <div className="legend-container">
      {legendData.map((item, index) =>
        <div key={index} className="legend-item" style={{ backgroundColor: item.color }}>
          <span className="legend-text">
            {item.label}
          </span>
        </div>
      )}
    </div>
  )
}

export default MapLegend
