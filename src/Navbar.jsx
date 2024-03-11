import { useState } from "react"
import { Link } from "react-router-dom"
import { Heading, Icon } from "@chakra-ui/react"
import { GiHamburgerMenu, GiCancel } from "react-icons/gi" // Import hamburger and cancel icons
import "../src/css/Navbar.css" // Assuming your CSS file path is correct
import MapLegend from "./MapLegend"

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false)

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  return (
    <nav className="navbar">
      <button className="toggle-nav-button" onClick={toggleSidebar}>
        {showSidebar ? <Icon as={GiCancel} /> : <Icon as={GiHamburgerMenu} />}
      </button>
      <div className={`nav-sidebar ${showSidebar ? "show" : ""}`}>
        <Link to="/home" className="menu-item">
          <Heading className="nav-heading" mr={"6"}>
            CitizAir
          </Heading>
        </Link>
        <div className="mobile-nav-content">visualize the air pollution of Stockholm</div>
        <div className="menu">
          <Link to="/about-air-pollution" className="menu-item">
            About Air Pollution
          </Link>
          <Link to="/about-us" className="menu-item">
            About Us
          </Link>
        </div>
        <div className="map-legend" containerStyle={{ position: "relative", marginBottom:"20px"}}>
          <MapLegend />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
