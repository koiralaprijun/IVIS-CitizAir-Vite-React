import "../src/css/MapLegend.css"
import { Tooltip } from '@chakra-ui/react'

const MapLegend = () => {
  const legendData = [
    { label: "Good", color: "#55A84F" },
    { label: "Moderate", color: "#A3C853" },
    { label: "Unhealthy for sensitive groups", color: "#FFD320" },
    { label: "Unhealthy", color: "#E93F33" },
    { label: "Very unhealthy", color: "#AA069F" },
    { label: "Hazardous", color: "#731425" }
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
