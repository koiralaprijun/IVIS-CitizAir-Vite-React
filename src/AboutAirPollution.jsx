import React, { useRef, useEffect } from "react"
import * as d3 from "d3"
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react"
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon
} from "@chakra-ui/react"

import "../src/css/AboutAirPollution.css"

export const ComparisonChart = () => {
  const svgRef = useRef(null)

  useEffect(() => {
    const data = {
      name: "root",
      children: [
        { name: "Human Hair", value: 70 },
        { name: "PM10", value: 10 },
        { name: "PM2.5", value: 5 }
      ]
    }

    const width = 600
    const height = 300

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("text-anchor", "middle")

    const root = d3
      .hierarchy(data)
      .sum((d) => d.value)
      .sort((a, b) => b.value - a.value)

    const pack = d3.pack().size([width, height]).padding(5)

    pack(root)

    const node = svg
      .selectAll("g")
      .data(root.descendants().slice(1))
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${d.x},${d.y})`)

    node
      .append("circle")
      .attr("r", (d) => d.r)
      .attr("fill", (d) => {
        if (d.data.name === "Human Hair") return "teal"
        if (d.data.name === "PM10") return "orange"
        if (d.data.name === "PM2.5") return "cyan"
        return "none" // Fallback color
      })

    node
      .append("text")
      .text((d) => d.data.name)
      .attr("dy", 4) // Slight adjustment to align text within the circle
      .style("font-size", (d) => {
        if (d.data.name === "Human Hair") return "18px" // Increase font size for Human Hair
        if (d.data.name === "PM10" || d.data.name === "PM2.5") return "12px" // Decrease font size for PM10 and PM2.5
        return "12px" // Default font size
      })

    node
      .on("mouseover", function () {
        d3.select(this).select("circle").style("fill-opacity", 0.95)
      })
      .on("mouseout", function () {
        d3.select(this).select("circle").style("fill-opacity", 1)
      })

    return () => {
      // Clean up D3 elements if needed
    }
  }, []) // Empty dependency array to run only once

  return (
    <div id="comparision-chart">
      <svg ref={svgRef}></svg>
    </div>
  )
}

const AirQualityIndex = () => {
  const categories = [
    {
      name: "Good",
      color: "#a8e05f",
      description:
        "Air quality is considered satisfactory, and air pollution poses little or no risk"
    },
    {
      name: "Moderate",
      color: "#fdd64b",
      description:
        "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution."
    },
    {
      name: "Unhealthy for Sensitive Groups",
      color: "#f99049",
      description:
        "Members of sensitive groups may experience health effects. The general public is not likely to be affected."
    },
    {
      name: "Unhealthy",
      color: "#f65e5f",
      description:
        "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects"
    },
    {
      name: "Very Unhealthy",
      color: "#a070b6",
      description:
        "Health warnings of emergency conditions. The entire population is more likely to be affected."
    },
    {
      name: "Hazardous",
      color: "#a06a7b",
      description:
        "Health alert: everyone may experience more serious health effects"
    }
  ]

  return (
    <Stack spacing={4} align="stretch">
      <Heading as="h2" size="lg" p={4} bg="gray.100" textAlign="center">
        How good is the weather?
      </Heading>
      {categories.map((category, index) => (
        <Box key={index} bg={category.color} p={4} color="#3b3b3b">
          <Heading as="h3" size="md">
            {category.name}
          </Heading>
          <Text mt={2}>{category.description}</Text>
        </Box>
      ))}
    </Stack>
  )
}

const UsefulLinks = () => (
  <div>{/* Map over an array of health impact items */}</div>
)

const FAQAccordion = () => (
  <div>
    <Heading as="h3" size="md" my="4">
      Air Pollutants
    </Heading>
    <Accordion allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton _expanded={{ bg: "#3182CE", color: "white" }}>
            <Box as="span" flex="1" textAlign="left">
              What is PM?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h2>
          <AccordionButton _expanded={{ bg: "#3182CE", color: "white" }}>
            <Box as="span" flex="1" textAlign="left">
              What is O2?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h2>
          <AccordionButton _expanded={{ bg: "#3182CE", color: "white" }}>
            <Box as="span" flex="1" textAlign="left">
              What is NoX?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h2>
          <AccordionButton _expanded={{ bg: "#3182CE", color: "white" }}>
            <Box as="span" flex="1" textAlign="left">
              What is Birch Pollen?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h2>
          <AccordionButton _expanded={{ bg: "#3182CE", color: "white" }}>
            <Box as="span" flex="1" textAlign="left">
              What is AQI?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  </div>
)

const AboutAirPollution = () => (
  <Flex
    direction={{ base: "column", md: "row" }}
    justify="space-between"
    className="main-container"
  >
    <Flex direction="column" className="first-col" p={4} flex="1">
      <ComparisonChart />
      <FAQAccordion className="faq-accordion" />
    </Flex>
    <Flex className="second-col" p={4} flex="1">
      <AirQualityIndex />
    </Flex>
    <Flex className="third-col" p={4} flex="1">
      <UsefulLinks />
    </Flex>
  </Flex>
)

export default AboutAirPollution
