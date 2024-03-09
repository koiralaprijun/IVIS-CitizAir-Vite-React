import React, { useEffect, useState } from "react"
import * as d3 from "d3"
import { ThreeDayData } from "./ThreeDayData" // Importing ThreeDayData object
import { Select, Flex, Box } from "@chakra-ui/react" // Importing Chakra UI components
import "../src/css/BarChart.css"

const BarChart = () => {
  const [selectedPollutant, setSelectedPollutant] = useState("NitrogenDioxide")

  useEffect(
    () => {
      updateChart(selectedPollutant)
    },
    [selectedPollutant]
  )

  const margin = { top: 30, right: 30, bottom: 70, left: 60 }
  const width = 420 - margin.left - margin.right
  const height = 300 - margin.top - margin.bottom

  const x = d3.scaleBand().range([0, width]).padding(0.1)
  const y = d3.scaleLinear().range([height, 0])

  // Append the tooltip div to the body
  const tooltip = d3
    .select("body")
    .selectAll("div.tooltip")
    .data([0])
    .join("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("position", "absolute")
    .style("background", "white")
    .style("border", "1px solid #ccc")
    .style("border-radius", "5px")
    .style("padding", "5px")
    .style("pointer-events", "none") // Important to prevent the tooltip from interfering with mouse events.

  const updateChart = selectedPollutant => {
    const data = ThreeDayData.data[selectedPollutant].values.map(d => ({ time: d.time, value: d.value }))

    x.domain(data.map(d => d.time))
    y.domain([0, d3.max(data, d => +d.value)])

    // Clear SVG content before redrawing
    const svg = d3.select("#chart").html("")

    // Append group element for chart content again after clearing
    const chart = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`)

    // Redrawing the axes should be done here, after clearing the SVG and before or after plotting the data points
    chart
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickValues(data.map(d => d.time)).tickFormat((d, i) => ["March 12", "March 13", "March 14"][i]))

    chart.append("g").call(d3.axisLeft(y))

    chart
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#0067b5")
      .attr("stroke-width", 2)
      .attr("d", d3.line().x(d => x(d.time) + x.bandwidth() / 2).y(d => y(d.value)))

    chart
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", d => x(d.time) + x.bandwidth() / 2)
      .attr("cy", d => y(d.value))
      .attr("r", 5)
      .attr("fill", "#0067b5")
      .on("mouseover", function(event, d) {
        tooltip.style("opacity", 1).html(`Value: ${d.value}`).style("left", `${event.pageX + 10}px`).style("top", `${event.pageY - 15}px`)

        d3.select(this).attr("r", 12).attr("fill", "orange")
      })
      .on("mouseout", function() {
        tooltip.style("opacity", 0)
        d3.select(this).attr("r", 5).attr("fill", "#0067b5")
      })
  }

  const handlePollutantChange = event => {
    setSelectedPollutant(event.target.value)
  }

  return (
    <Flex direction="column" align="center">
      <Box mt={4}>
        <Select bgColor={"gray.200"} value={selectedPollutant} onChange={handlePollutantChange}>
          <option value="NitrogenDioxide">Nitrogen Dioxide (NO2)</option>
          <option value="PM10">Particle - PM10</option>
          <option value="Ozone">Ozone(O3)</option>
          <option value="BirchPollen">Pollen</option>
          <option value="RiskIndexWithoutBirchPollen">AQHI</option>
          <option value="RiskIndexWithBirchPollen">AQI</option>
        </Select>
      </Box>
      <svg id="chart" width={width + margin.left + margin.right} height={height + margin.top + margin.bottom} />
    </Flex>
  )
}

export default BarChart
