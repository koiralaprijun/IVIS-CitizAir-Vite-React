import React, { useEffect } from "react"
import * as d3 from "d3"
import "../src/css/MapLegend.css"

const MapLegend = () => {
  useEffect(() => {
    const svg = d3.select(".legend-svg")

    // Legend categories
    const legendData = [
      { label: "Good", color: "green" },
      { label: "Moderate", color: "yellow" },
      { label: "Unhealthy for sensitive groups", color: "orange" },
      { label: "Unhealthy", color: "red" },
      { label: "Very unhealthy", color: "purple" },
      { label: "Hazardous", color: "darkred" },
    ]

    const g = svg
      .selectAll("g")
      .data(legendData)
      .enter()
      .append("g")
      .attr("transform", (d, i) => `translate(0, ${i * 20})`)

    g.append("rect")
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", (d) => d.color)

    g.append("text")
      .attr("x", 15)
      .attr("y", 9)
      .attr("font-size", "10px")
      .text((d) => d.label)
  }, [])

  return <svg className="legend-svg" width={200} height={100}></svg>
}

export default MapLegend
