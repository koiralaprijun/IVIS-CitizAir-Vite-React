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

  const updateChart = selectedPollutant => {
    const data = ThreeDayData.data[selectedPollutant].values.map(d => ({ time: d.time, value: d.value }))

    x.domain(data.map(d => d.time))
    y.domain([0, d3.max(data, d => +d.value)])

    const svg = d3.select("#chart").html("")
    const chart = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`)

    chart
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#0067b5")
      .attr("stroke-width", 2)
      .attr("d", d3.line().x(d => x(d.time) + x.bandwidth() / 2).y(d => y(d.value)))

    const circles = chart
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => x(d.time) + x.bandwidth() / 2)
      .attr("cy", d => y(d.value))
      .attr("r", 6)
      .attr("fill", "#0067b5")
      .on("mouseover", function(event, d) {
        d3.select(this).transition().duration(150).attr("r", 12).attr("fill", "orange")
      })
      .on("mouseout", function(d) {
        d3.select(this).transition().duration(150).attr("r", 5).attr("fill", "#0067b5")
      })
      .append("title")
      .text(d => {
        return d.value
      })

    // Append title element to circles for default tooltips (if you're not using a custom tooltip)
    circles.append("title").text(d => `Value: ${d.value}`)

    chart
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickValues(data.map(d => d.time)).tickFormat((d, i) => ["March 12", "March 13", "March 14"][i]))
      .selectAll("path")
      .attr("stroke-width", 2)
      .attr("stroke", "#0067b5")

    chart.append("g").call(d3.axisLeft(y)).selectAll("path").attr("stroke-width", 2).attr("stroke", "#0067b5")
  }

  const handlePollutantChange = event => {
    setSelectedPollutant(event.target.value)
  }

  return (
    <Flex direction="column" align="center">
      <Box mt={4}>
        <Select bgColor={"gray.200"} value={selectedPollutant} onChange={handlePollutantChange}>
          <option value="NitrogenDioxide">Nitrogen Dioxide(No2)</option>
          <option value="PM10">Particle - PM10</option>
          <option value="Ozone">Ozone(O3)</option>
        </Select>
      </Box>
      <svg id="chart" width={width + margin.left + margin.right} height={height + margin.top + margin.bottom} />
    </Flex>
  )
}

export default BarChart
