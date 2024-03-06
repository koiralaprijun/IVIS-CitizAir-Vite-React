const baseURL = "https://api.waqi.info/feed/"
const baseCity = "stockholm"
const token = "a3bf1197881754e07fb1a334116289ffb6104296"

const apiURL = `${baseURL}${baseCity}/?token=${token}`

fetch(apiURL)
  .then((response) => response.json())
  .then((data) => {
    // Handle data
  })
  .catch((error) => {
    console.error("Error fetching data:", error)
  })

export { baseURL, baseCity, token, apiURL }
