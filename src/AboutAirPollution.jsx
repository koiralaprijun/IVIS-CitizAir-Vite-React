import React, { useRef, useEffect } from "react"
import * as d3 from "d3"

import "../src/css/AboutAirPollution.css"

const Header = () => (
  <div>
    <h1>How good is the weather?</h1>
  </div>
)

export const ComparisonChart = () => {
  const d3Container = useRef(null)

  useEffect(() => {
    if (d3Container.current) {
      // Define data
      const data = [
        { name: "Human Hair", value: 70, color: "teal" }, // Value is hypothetical diameter scale
        { name: "PM10", value: 10, color: "orange" },
        { name: "PM2.5", value: 5, color: "maroon" }
      ]

      // Define dimensions
      const width = 600
      const height = 300

      // Create SVG container
      const svg = d3
        .select(d3Container.current)
        .attr("width", width)
        .attr("height", height)

      // Create a scale for your circles
      const scale = d3
        .scaleSqrt()
        .domain([0, d3.max(data, (d) => d.value)])
        .range([0, width / 3])

      // Remove previous circles if they exist
      svg.selectAll("circle").remove()
      svg.selectAll("text").remove()

      // Create circles
      const circles = svg
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d, i) => (i * width) / 3 + width / 6)
        .attr("cy", height / 2)
        .attr("r", (d) => scale(d.value))
        .attr("fill", (d) => d.color)

      // Add labels
      svg
        .selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", (d, i) => (i * width) / 3 + width / 6)
        .attr("y", height / 2)
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em") // to vertically center text
        .text((d) => d.name)

      // Add interactivity
      circles
        .on("mouseover", function (event, d) {
          d3.select(this).attr("opacity", 0.7)
          // You could also show a tooltip or change the circle size, etc.
        })
        .on("mouseout", function () {
          d3.select(this).attr("opacity", 1)
        })
    }
  }, [])

  return <svg ref={d3Container} />
}

const AirQualityIndex = () => (
  <div>{/* Map over an array of quality levels and descriptions */}</div>
)

const HealthImpact = () => (
  <div>{/* Map over an array of health impact items */}</div>
)

const FAQAccordion = () => <div>{/* FAQ items */}</div>

const Footer = () => <div>{/* Footer content */}</div>

const AboutAirPollution = () => (
  <div>
    <Header />
    <ComparisonChart />
    <AirQualityIndex />
    <HealthImpact />
    <FAQAccordion />
    <Footer />
  </div>
)

export default AboutAirPollution
