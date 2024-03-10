import React, { useState, useEffect, useRef } from "react"
import "../src/css/SearchBar.css"

const SearchBar = ({ onSelectAqi, variant }) => {
  const [data, setData] = useState([])
  const [filterData, setFilterData] = useState(null)
  const [inputValue, setInputValue] = useState("") // New state for storing input value
  const searchResultsRef = useRef(null)

  useEffect(() => {
    fetch("https://api.waqi.info/search/?keyword=stockholm&token=a3bf1197881754e07fb1a334116289ffb6104296")
      .then(response => response.json())
      .then(data => {
        console.log("Fetched Data:", data)
        setData(data)
        setFilterData(data.data)
      })
      .catch(error => console.log(error))

    // Event listener to handle clicks outside of the search results
    const handleClickOutside = event => {
      if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
        setData([])
      }
    }

    // Adding event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside)

    // Cleanup function to remove event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleFilter = value => {
    setInputValue(value) // Update the input value as user types
    if (filterData) {
      const response = filterData.filter(f => f.station.name.toLowerCase().includes(value.toLowerCase()))
      setData(response)
      if (value === "") {
        setData([])
      }
    }
  }

  const handleClick = (aqi, name) => {
    onSelectAqi({ aqi, name })
    setData([]) // Hide the search results
    setInputValue(name) // Update the input field to show the selected location
  }

  // Function to remove specific words from station name
  const removeWordsFromStationName = stationName => {
    // List of words to remove
    const wordsToRemove = ["stockholm", "sweden", ",", "108", "59", "70", "E4", "107", "E20", "83"] // Add the words you want to remove here

    // Constructing a regular expression pattern to match any of the words to remove
    const pattern = new RegExp(wordsToRemove.join("|"), "gi")

    // Removing the words from the station name using the regular expression
    return stationName.replace(pattern, "")
  }

  return (
    <div className={`input-wrapper ${variant}`}>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Location..."
          value={removeWordsFromStationName(inputValue)} // Controlled input with modified value
          onChange={e => handleFilter(e.target.value)}
        />
      </div>
      <div className="search-results" ref={searchResultsRef}>
        {Array.isArray(data) &&
          data.map((d, i) =>
            <div key={i} onClick={() => handleClick(d.aqi, d.station.name)}>
              {removeWordsFromStationName(d.station.name)}
            </div>
          )}
      </div>
    </div>
  )
}

export default SearchBar
