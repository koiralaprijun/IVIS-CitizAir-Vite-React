import React, { useState } from "react"
import Slider from "@mui/material/Slider"
import Typography from "@mui/material/Typography"
import { SimpleGrid, Box, Select, Button, ButtonGroup, Checkbox, Progress, CheckboxGroup, useColorModeValue, Heading, Text, Stack, RadioGroup, Radio } from "@chakra-ui/react"
import { Input, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react"
import { PhoneIcon, Search2Icon, AddIcon, WarningIcon } from "@chakra-ui/icons"
import "../src/css/TimelineSlider.css"

function valuetext(value) {
  return `${value} hour${value !== 1 ? "s" : ""}`
}

const TimelineSlider = ({ currentHour, onChange }) => {
  const [selectedOption, setSelectedOption] = useState("aqi")

  const handleSelectChange = event => {
    setSelectedOption(event.target.value)
  }
  return (
    <Box width={400}>
      <Select fontSize={"sm"} borderRadius={"none"} mb={"4"} border={"none"} borderBottom={"1px"} value={selectedOption} onChange={handleSelectChange}>
        <option value="no2">Nitrogen Dioxide (NO2)</option>
        <option value="pm10">Particle - PM10</option>
        <option value="o3">Ozone(O3)</option>
        <option value="pollen">Pollen</option>
        <option value="aqi">AQI</option>
      </Select>
      <Slider
        aria-label="Timeline"
        value={typeof currentHour === "number" ? currentHour : 0}
        onChange={onChange}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={0}
        max={71}
        valueLabelFormat={valuetext}
      />
      <Typography id="input-slider" gutterBottom>
        Slide to Check Hourly Forecast
      </Typography>
    </Box>
  )
}

export default TimelineSlider
