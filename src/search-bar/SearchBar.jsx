import { useState } from "react"
import { Search2Icon } from "@chakra-ui/icons"
import "./SearchBar.css"

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("")

  const fetchData = (value) => {
    fetch(
      `https://api.waqi.info/search/?keyword=stockholm&token=a3bf1197881754e07fb1a334116289ffb6104296`
    )
      .then((response) => response.json())
      .then((data) => {
        const results = data.data.filter((result) => {
          return (
            value &&
            result.station.name &&
            result.station.name.toLowerCase().includes(value)
          )
        })
        setResults(results) // Log the filtered results
       
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
      })
  }

  const handleChange = (value) => {
    setInput(value)
    fetchData(value)
  }

  return (
    <div className="input-wrapper">
      <Search2Icon id="search-icon" />
      <input
        placeholder="Search Location..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  )
}

export const SearchResult = ({ result }) => {
  return (
    <div
      className="search-result"
      onClick={(e) => alert(`You selected ${result}!`)}
    >
      {result}
    </div>
  )
}

export const SearchResultsList = ({ results }) => {
  return (
    <div className="results-list">
      {results.map((result, id) => {
        return <SearchResult result={result.station.name} key={id} />
      })}
    </div>
  )
}
