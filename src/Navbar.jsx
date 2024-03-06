import React, { useState } from "react"
import { SearchBar, SearchResultsList } from "./search-bar/SearchBar"
import ComparePlace from "./ComparePlace"
import "../src/css/Navbar.css"

const Navbar = () => {
  const [results, setResults] = useState([])

  
  return (
    <nav className="navbar">
      <div className="left-navbar">
        <div className="logo">CitizAir</div>
        <div className="menu">
          <a href="#" className="menu-item">
            About Air Pollution
          </a>
          <a href="#" className="menu-item">
            About Us
          </a>
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
