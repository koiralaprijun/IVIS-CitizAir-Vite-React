import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./Navbar"
import "../src/css/App.css"
import Home from "./Home"
import AboutAirPollution from "./AboutAirPollution"
import AboutUs from "./AboutUs"

const App = () => {
  const [selectedDay, setSelectedDay] = useState("d01")
  const [aqiData, setAqiData] = useState({
    aqiValue: null,
    aqiText: null,
    cityName: null
  })

  const handleDayChange = day => {
    setSelectedDay(day)
  }

  // const updateAqiData = data => {
  //   setAqiData(data)
  // }

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div>
          <Routes>
            <Route path="/home" element={<Home selectedDay={selectedDay} aqiData={aqiData} onDayChange={handleDayChange} />} />
            <Route path="/about-air-pollution" element={<AboutAirPollution />} />
            <Route path="/about-us" element={<AboutUs />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
