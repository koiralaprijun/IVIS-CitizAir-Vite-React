import express from "express"
import cors from "cors"
import fetch from "node-fetch"

const app = express()
const PORT = process.env.PORT || 3001 // Choose a port for your proxy server

app.use(
  cors({
    origin: "http://127.0.0.1:5173", // Allow requests from your frontend application
    methods: ["GET", "POST"]
  })
)

app.get("/api/data", async (req, res) => {
  try {
    const response = await fetch("https://open.slbanalys.se/timeseries/aqhi/v1/get_daily_forecast?species=nox&easting=135139&northing=6596900&include_road_model=yes")
    const data = await response.json()
    res.json(data)
  } catch (error) {
    console.error("Error fetching data:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`)
})
