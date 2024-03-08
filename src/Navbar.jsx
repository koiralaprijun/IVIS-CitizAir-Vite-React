import React, { useState } from "react"
import { Link } from "react-router-dom" 
import ComparePlace from "./ComparePlace"
import { SearchBar } from "./search-bar/SearchBar"
import { Heading } from "@chakra-ui/react"
import "../src/css/Navbar.css"

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="left-navbar">
        <Link to="/home" className="menu-item">
          <Heading>CitizAir</Heading>
        </Link>
        <div className="menu">
          <Link to="/about-air-pollution" className="menu-item">
            About Air Pollution
          </Link>
          <Link to="/about-us" className="menu-item">
            About Us
          </Link>
        </div>
      </div>
      <div className="right-navbar">
        <ComparePlace />
      </div>
    </nav>
  )
}

export default Navbar
