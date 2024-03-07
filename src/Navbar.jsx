import React, { useState } from "react"
import { SearchBar, SearchResultsList } from "./search-bar/SearchBar"
import { Link } from "react-router-dom" // Already imported, which is good
import ComparePlace from "./ComparePlace"
import { Heading } from "@chakra-ui/react"
import "../src/css/Navbar.css"

const Navbar = () => {
  const [results, setResults] = useState([])

  return (
    <nav className="navbar">
      <div className="left-navbar">
        <Link to="/home" className="menu-item">
          <Heading>CitizAir</Heading>
        </Link>
        <div className="menu">
          {/* Update these <a> tags to use <Link> for SPA navigation */}
          <Link to="/about-air-pollution" className="menu-item">
            About Air Pollution
          </Link>
          <Link to="/about-us" className="menu-item">
            About Us
          </Link>
        </div>
      </div>
      <div className="right-navbar">
        <div className="search-bar-container">
          <SearchBar setResults={setResults} />
          {results && results.length > 0 && (
            <SearchResultsList results={results} />
          )}
        </div>
        <ComparePlace />
      </div>
    </nav>
  )
}

export default Navbar
