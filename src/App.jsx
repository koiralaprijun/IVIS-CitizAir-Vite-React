import { useState } from "react"
import Navbar from "./Navbar.jsx"
import "../src/css/App.css"
import IsoplethMap from "./IsoplethMap.jsx"
import Sidebar from "./Sidebar.jsx"
// import ComparePlace from "./ComparePlace.jsx"
//import MyComponent from "./TimelineSlider.jsx"

const App = () => {
  const [selectedDay, setSelectedDay] = useState("d01")
  const [aqiData, setAqiData] = useState({
    aqiValue: null,
    aqiText: null,
    cityName: null
  })

  const handleDayChange = (day) => {
    setSelectedDay(day)
  }

  // New method to update AQI data
  const updateAqiData = (data) => {
    setAqiData(data)
  }

  return (
    <div className="App">
      <Navbar updateAqiData={updateAqiData} />
      <div className="main-content">
        <IsoplethMap selectedDay={selectedDay} />
        <Sidebar aqiData={aqiData} onDayChange={handleDayChange} />
        {/* <MyComponent /> */}
      </div>
    </div>
  )
}

export default App
