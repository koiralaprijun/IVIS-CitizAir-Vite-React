import React, { useEffect, useState } from "react"
import "../src/css/ComparePlace.css"
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Progress,
  CheckboxGroup,
  CloseButton,
  useColorModeValue,
  Heading,
  Text,
  Stack
} from "@chakra-ui/react"
import { Flex, Spacer } from "@chakra-ui/react"
import { Input, IconButton } from "@chakra-ui/react"
import { PhoneIcon, Search2Icon, AddIcon, WarningIcon } from "@chakra-ui/icons"
import * as myModule from "@chakra-ui/react"

const ComparePlace = ({ onSearch }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [cityName, setCityName] = useState(null)
  const [aqiValue, setAqiValue] = useState(null)
  const [aqiText, setAqiText] = useState(null)
  const [backgroundColor, setBackgroundColor] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    //Get the AQI Value of nearest Station
    fetch(
      "https://api.waqi.info/feed/here/?token=a3bf1197881754e07fb1a334116289ffb6104296"
    )
      .then((response) => response.json())
      .then((data) => {
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
      .catch((error) => {
        console.error("Error fetching data:", error)
      })
  }, [])

  const getAqiInfo = (aqiValue) => {
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleSearch = () => {
    onSearch(searchTerm)
  }

  const handleChange = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div className="container">
      <div className="toggle-bar">
        <button className="toggle-btn" onClick={toggleSidebar}>
          <Text fontSize="sm">Compare Place</Text>
        </button>
      </div>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="close-btn" onClick={toggleSidebar}>
          <Flex aria-label="Search database">
            <Spacer />
            <CloseButton border="1px" borderColor="gray.200" />
          </Flex>
        </div>
        <Text mb={6} fontSize={"3xl"}>Compare Places</Text>
        <Flex className="search-compare-container" alignItems="center" mb={6}>
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={handleChange}
            mr={2}
          />
          <IconButton aria-label="Search" onClick={handleSearch}>
      <Search2Icon />
    </IconButton>
        </Flex>
        <Flex>
          <Box
            className="compare-box"
            p="4"
            border="1px"
            borderColor="gray.200"
          >
            <div
              className="heading-container"
              style={{ backgroundColor: backgroundColor }}
            >
              <div className="header-aqi-value">
                <Heading as="h3" size="md" mb="4">
                  {cityName ? cityName : <Text fontSize="sm">Loading...</Text>}
                </Heading>
                <div className="aqi-value-container">
                  <div className="aqi-value">{aqiValue}</div>
                  <Text fontSize="xs" color="#495e1b">
                    AQI Value
                  </Text>
                </div>
              </div>
              <div className="aqi-text">{aqiText}</div>
            </div>
            <div className="progress-bar">
              <Stack spacing={3}>
                <Text>AQI - </Text>
                <Progress colorScheme="green" size="xs" value={20} />
                <Text>PM10 - </Text>
                <Progress colorScheme="green" size="xs" value={55} />
                <Text>NoX - </Text>
                <Progress colorScheme="green" size="xs" value={12} />
                <Text>Birch Pollen -</Text>
                <Progress colorScheme="green" size="xs" value={89} />
              </Stack>
            </div>
          </Box>
          <Spacer />
          <Box
            className="compare-box"
            p="4"
            border="1px"
            borderColor="gray.200"
          >
            <div
              className="heading-container"
              style={{ backgroundColor: backgroundColor }}
            >
              <div className="header-aqi-value">
                <Heading as="h3" size="md" mb="4">
                  {cityName ? cityName : <Text fontSize="sm">Loading...</Text>}
                </Heading>
                <div className="aqi-value-container">
                  <div className="aqi-value">{aqiValue}</div>
                  <Text fontSize="xs" color="#495e1b">
                    AQI Value
                  </Text>
                </div>
              </div>
              <div className="aqi-text">{aqiText}</div>
            </div>

            <div className="progress-bar">
              <Stack spacing={3}>
                <Text>AQI - </Text>
                <Progress colorScheme="green" size="xs" value={20} />
                <Text>PM10 - </Text>
                <Progress colorScheme="green" size="xs" value={55} />
                <Text>NoX - </Text>
                <Progress colorScheme="green" size="xs" value={12} />
                <Text>Birch Pollen -</Text>
                <Progress colorScheme="green" size="xs" value={89} />
              </Stack>
            </div>
          </Box>
        </Flex>
      </div>
    </div>
  )
}

export default ComparePlace
