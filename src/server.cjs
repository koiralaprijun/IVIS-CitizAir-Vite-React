const fetch = require("node-fetch")
const fs = require("fs").promises

async function fetchDataAndSaveToFile() {
  try {
    const response = await fetch("https://api.waqi.info/search/?keyword=stockholm&token=a3bf1197881754e07fb1a334116289ffb6104296")
    const data = await response.json()

    // Save data to a JSON file
    await fs.writeFile("stockholm_data.json", JSON.stringify(data))
    console.log("Data saved to stockholm_data.json")
  } catch (error) {
    console.error("Error fetching data:", error)
  }
}

fetchDataAndSaveToFile()
