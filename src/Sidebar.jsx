import React, { useEffect, useState, useRef } from "react"
import ForecastMap from "./ForecastMap"
import JsonData from "./AqiHrData.json" // Import your JSON data
import DailyToggleButton from "./DailyToggleButton"
//import { ThreeDayData } from "./ThreeDayData" // Importing ThreeDayData object

import BarChart from "./BarChart"

// Import Styles
import { SimpleGrid, Box, Button, ButtonGroup, Checkbox, Progress, CheckboxGroup, useColorModeValue, Heading, Text, Stack, RadioGroup, Radio } from "@chakra-ui/react"
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react"
import "../src/css/Sidebar.css"

const Sidebar = ({ onDayChange }) => {
  const containerRef = useRef()
  const hoverColor = useColorModeValue("gray.100", "gray.200")
  const [aqiValue, setAqiValue] = useState(null)
  const [cityName, setCityName] = useState(null)
  const [aqiText, setAqiText] = useState(null)
  const [backgroundColor, setBackgroundColor] = useState(null)
  const [selectedMetric, setSelectedMetric] = useState("aqi")
  const [selectedDate, setSelectedDate] = useState("d01")

  useEffect(() => {
    //Get the AQI Value of nearest Station
    fetch("https://api.waqi.info/feed/here/?token=a3bf1197881754e07fb1a334116289ffb6104296")
      // fetch(
      //   "https://api.waqi.info/feed/@10009/?token=a3bf1197881754e07fb1a334116289ffb6104296"
      // )
      .then(response => response.json())
      .then(data => {
        if (data.status === "ok") {
          setAqiValue(data.data.aqi)
          const placeName = data.data.city.name.split(" ")
          setCityName(placeName.slice(0, 4).join(" "))
          const { text, color } = getAqiInfo(data.data.aqi)
          setAqiText(text)
          setBackgroundColor(color)
        } else {
          console.error("Error fetching data:", data.message)
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error)
      })
  }, [])

  const getAqiInfo = aqiValue => {
    if (aqiValue >= 0 && aqiValue <= 50) {
      return { text: "Good", color: "#a8e05f" }
    } else if (aqiValue <= 100) {
      return { text: "Moderate", color: "#fdd64b" }
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

  const handleDateAndMetricChange = (date, metric) => {
    console.log("Updating day and metric:", { date, metric })
    setSelectedDate(date) // Update the selectedDate state
    setSelectedMetric(metric) // Update the selectedMetric state
    onDayChange({ day: date, metric }) // Notify the parent component
  }

  return (
    <div className="sidebar-container" ref={containerRef}>
      <div className="heading-container" style={{ backgroundColor: backgroundColor }}>
        <div className="header-aqi-value">
          <Heading as="h3" size="md" mb="4">
            {cityName ? cityName : <Text fontSize="sm">Loading...</Text>}
          </Heading>
          <div className="aqi-value-container">
            <div className="aqi-value">
              {aqiValue}
            </div>
            <Text fontSize="xs" color="#495e1b">
              AQI Value
            </Text>
          </div>
        </div>
        <div className="aqi-text">
          {aqiText}
        </div>
      </div>
      <div className="filter-section">
        <Box mr="2" mb="4">
          <RadioGroup onChange={value => handleDateAndMetricChange(selectedDate, value)}>
            <Stack spacing={[1, 8]} direction={["column", "row"]}>
              <Radio value="aqi">AQI</Radio>
              <Radio value="pm10">PM10</Radio>
              <Radio value="nox">NoX</Radio>
              <Radio value="pollen">Pollen</Radio>
            </Stack>
          </RadioGroup>
        </Box>
        <DailyToggleButton onDateChange={date => handleDateAndMetricChange(date, selectedMetric)} />
      </div>
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{ bg: "#3182CE", color: "white" }}>
              <Box as="span" flex="1" textAlign="left">
                Expand Bar Chart
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <BarChart />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <ForecastMap JsonData={JsonData} />
    </div>
  )
}

export default Sidebar
