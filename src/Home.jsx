import React from "react"
import IsoplethMap from "./IsoplethMap"
import Sidebar from "./Sidebar"
import "../src/css/Home.css"

const Home = ({ selectedDay, aqiData, onDayChange }) => {
  return (
    <div className="main-content">
      <IsoplethMap selectedDay={selectedDay} />
      <Sidebar aqiData={aqiData} onDayChange={onDayChange} />
    </div>
  )
}

export default Home
