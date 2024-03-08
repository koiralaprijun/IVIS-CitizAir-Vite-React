import React, { useState } from "react"
import IsoplethMap from "./IsoplethMap"
import Sidebar from "./Sidebar"
//import MapLegend from "./MapLegend"
import "../src/css/Home.css"

const Home = () => {
  // Initialize state for selectedDay and selectedMetric
  const [selectedDay, setSelectedDay] = useState(null)
  const [selectedMetric, setSelectedMetric] = useState("aqi") // Default to 'aqi'

  // Function to update both selectedDay and selectedMetric
  // This assumes the structure { day: string, metric: string }
  const handleDayAndMetricChange = ({ day, metric }) => {
    setSelectedDay(day)
    setSelectedMetric(metric)
  }

  return (
    <div className="main-content">
      <IsoplethMap selectedDay={selectedDay} selectedMetric={selectedMetric} />
      {/* Updated to pass handleDayAndMetricChange */}
      <Sidebar onDayChange={handleDayAndMetricChange} />
    </div>
  )
}

export default Home
