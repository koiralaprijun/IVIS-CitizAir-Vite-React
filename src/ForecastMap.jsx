import React, { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import AqiHrData from "./AqiHrData.json"
import { Flex, Box, Select } from "@chakra-ui/react"

import "../src/css/ForecastMap.css"

const ForecastMap = () => {
  const svgRef = useRef(null)
  const tooltipRef = useRef(null)
  const [selectedOption, setSelectedOption] = useState("no2") // Initialize with default option

  useEffect(
    () => {
      if (!AqiHrData[selectedOption]) return

      const margin = { top: 10, right: 30, bottom: 30, left: 30 }
      const width = 500 - margin.left - margin.right
      const height = 300 - margin.top - margin.bottom
      const rows = 6
      const cols = 12
      const rowHeight = height / rows
      const colWidth = width / cols
      const values = AqiHrData[selectedOption].map(d => d.value)

      // Clear previous svg content
      d3.select(svgRef.current).selectAll("*").remove()

      const svg = d3
        .select(svgRef.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`)

      const color = d3.scaleSequential(d3.interpolateInferno).domain([0, d3.max(values)])

      svg
        .selectAll("rect")
        .data(values)
        .enter()
        .append("rect")
        .attr("x", (_, i) => i % cols * colWidth)
        .attr("y", (_, i) => Math.floor(i / cols) * rowHeight)
        .attr("width", colWidth)
        .attr("height", rowHeight)
        .attr("fill", d => color(d))
        .on("mouseover", (event, d) => {
          d3.select(tooltipRef.current).style("visibility", "visible").text(`Value: ${d}`)
        })
        .on("mousemove", event => {
          d3
            .select(tooltipRef.current)
            .style("top", event.pageY - 100 + "px") // Decrease the Y offset
            .style("left", event.pageX - 50 + "px") // You might adjust this as needed
        })
        .on("mouseout", () => {
          d3.select(tooltipRef.current).style("visibility", "hidden")
        })

      // Optional: add axes or other elements here
    },
    [selectedOption]
  )

  const handleSelectChange = event => {
    setSelectedOption(event.target.value)
  }

  return (
    <Flex mt="4" flexDirection="column" alignItems="flex-start">
      <Box mt={4} mb={2}>
        <Select onChange={handleSelectChange} value={selectedOption}>
          <option value="no2">Nitrogen Dioxide (NO2)</option>
          <option value="pm10">Particle - PM10</option>
          <option value="ozone">Ozone (O3)</option>
          <option value="birch">Pollen</option>
          <option value="aqhich">AQHICH</option>
          <option value="aqhi">AQHI</option>
        </Select>
      </Box>
      <div ref={tooltipRef} style={{ position: "absolute", visibility: "hidden", background: "white", border: "1px solid", padding: "5px" }}>
        Tooltip
      </div>
      <svg ref={svgRef} />
    </Flex>
  )
}

export default ForecastMap
