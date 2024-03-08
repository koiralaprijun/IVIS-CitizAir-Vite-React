import "../src/css/MapLegend.css"
import { Box, Flex, Text } from "@chakra-ui/react"

const MapLegend = () => {
  const legendData = [
    { label: "Good", color: "green" },
    { label: "Moderate", color: "yellow" },
    { label: "Unhealthy for sensitive groups", color: "orange" },
    // { label: "Unhealthy", color: "red" },
    // { label: "Very unhealthy", color: "purple" },
    // { label: "Hazardous", color: "darkred" }
  ]

  return (
    <Flex align="center" p="2" bg="rgb(99,99,99, 0.80)" color={"white"} borderRadius="sm" zIndex="10" position="absolute" left="20px" bottom="20px" gap="4">
      {legendData.map((item, index) =>
        <Box key={index} display="flex" alignItems="center">
          <Box w="30px" h="20px" bg={item.color} marginRight="2" />
          <Text fontSize="xs">
            {item.label}
          </Text>
        </Box>
      )}
    </Flex>
  )
}

export default MapLegend
