import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./Navbar"
import AboutAirPollution from "./AboutAirPollution"
import AboutUs from "./AboutUs"
import IsoplethMap from "./IsoplethMap"
import Sidebar from "./Sidebar"
//import TestCode from "./TestCode"

// Import Styling
import "../src/css/App.css"

const App = () => {
  const [selectedAqi, setSelectedAqi] = useState(null)
  const [isMobileScreen, setIsMobileScreen] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [selectedDay, setSelectedDay] = useState("d01")
  const [aqiData, setAqiData] = useState({
    aqiValue: null,
    aqiText: null,
    cityName: null
  })

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth >= 768)
    }

    handleResize() // Initial check
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const [selectedMetric, setSelectedMetric] = useState("aqi")

  const handleDayAndMetricChange = ({ day, metric }) => {
    setSelectedDay(day)
    setSelectedMetric(metric)
  }

  const handleDayChange = day => {
    setSelectedDay(day)
  }

  const updateAqiData = data => {
    setAqiData(data)
  }

  const handleSelectLocation = (lat, lon, name, aqi) => {
    setSelectedLocation({ lat, lon, name, aqi })
  }

  return (
    <Router>
      <div className="App">
        <Navbar isMobileScreen={isMobileScreen} />
        <Routes>
          <Route
            index // This replaces the path="/" with index for the main component
            element={
              <div className="container">
                <div className="left-container">
                  <IsoplethMap
                    isMobileScreen={isMobileScreen}
                    selectedDay={selectedDay}
                    selectedMetric={selectedMetric}
                    onDayChange={handleDayChange}
                    selectedLocation={selectedLocation}
                  />
                </div>
                <div className="right-container">
                  <Sidebar onDayChange={handleDayAndMetricChange} aqiData={aqiData} selectedAqi={selectedAqi} onSelectLocation={handleSelectLocation} />
                </div>
              </div>
            }
          />
          <Route path="/about-air-pollution" element={<AboutAirPollution />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
