import React, { useEffect, useRef } from "react"
import * as d3 from "d3"
import AqiHrData from "./AqiHrData.json"

import "../src/css/ForecastMap.css"
import { Box, Button, ButtonGroup, Checkbox, Progress, CheckboxGroup, useColorModeValue, Heading, Flex, Text, Stack } from "@chakra-ui/react"

const ForecastMap = () => {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!AqiHrData) return

    // Set the dimensions of the canvas / graph
    const margin = {
      top: 10,
      right: 30,
      bottom: 30,
      left: 30
    }
    const width = 500 - margin.left - margin.right
    const height = 300 - margin.top - margin.bottom

    // Set the amount of rows and columns
    const rows = 6
    const cols = 12

    // Calculate row and column height
    const row_height = Math.floor(height / rows)
    const col_width = Math.floor(width / cols)

    // Extract values from the data
    const values = AqiHrData.values.map(d => d.value)

    // Add svg with class "chart" and defined width + height - translate the chart such that top and right padding is visible
    const svg = d3.select(svgRef.current).append("svg").attr("class", "chart").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom)

    const color_chart = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`)

    // Select the colour range for the data
    const color = d3.scaleLinear().domain([0, d3.max(values)]).range(["#FFFFD9", "#A5D9E1", "#2C7BB6", "#081D58"])

    // Create all the rectangles in the chart, with the correct x/y coordinates and correct height and width. Fill with color scheme above.
    color_chart
      .selectAll("rect")
      .data(values)
      .enter()
      .append("rect")
      .attr("x", (d, i) => Math.floor(i / rows) * col_width)
      .attr("y", (d, i) => i % rows * row_height)
      .attr("width", col_width)
      .attr("height", row_height)
      .attr("fill", d => color(d))
      //Hover Functionality
      .on("mouseover", function(event, d) {
        d3.select(this).attr("opacity", 0.5)

        // Updated tooltip positioning logic
        const [x, y] = d3.pointer(event, svg.node())
        const offsetX = 10
        const offsetY = 10

        d3.select("#tooltip").style("left", x + offsetX + "px").style("top", y + offsetY + "px").text(d).text(`AQI: ${d}`)

        d3.select("#tooltip").classed("hidden", false)
      })
      .on("mouseout", function() {
        d3.select(this).attr("opacity", 1)
        // Hide value when not hovering
        d3.select("#tooltip").classed("hidden", true)
      })

    // Create X axis scale
    const xScale = d3.scaleBand().domain(Array.from({ length: 12 }, (_, i) => (i + 11) % 12 + 1)).range([0, width])

    // Add X axis
    svg.append("g").attr("transform", `translate(${margin.left}, ${height + margin.top})`).call(d3.axisBottom(xScale))

    // Cleanup function to remove the SVG when component unmounts
    return () => {
      d3.select(svgRef.current).selectAll("*").remove() // Remove all child elements
    }
  }, [])

  return (
    <Flex mt="4" flexDirection="column" alignItems="center" className="tooltip-container">
      <Heading as="h2" size="md">
        72 Hour Forecast
      </Heading>
      <span id="tooltip" className="hidden" />
      <div ref={svgRef} />
    </Flex>
  )
}

export default ForecastMap
