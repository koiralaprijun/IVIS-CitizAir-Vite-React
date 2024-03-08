import { Heading, Avatar, Box, Center, Text, Stack, Button, Link, Badge, useColorModeValue, Flex, Spacer, Image } from "@chakra-ui/react"
import "../src/css/AboutUs.css"

const OurProfile = () => {
  return (
    <Box className="right-container" py={6}>
      <Flex justifyContent={"flex-end"} mb={6}>
        <Box mx="4" maxW={"320px"} w={"full"} bg={useColorModeValue("white", "gray.900")} boxShadow={"2xl"} rounded={"lg"} p={6} textAlign={"center"}>
          <Avatar size={"xl"} src={"../public/img-jordan.jpg"} mb={4} />
          <Heading fontSize={"2xl"} fontFamily={"body"}>
            Jordan
          </Heading>
          <Text fontWeight={600} color={"gray.500"} mb={4}>
            jyjchian@kth.se
          </Text>
          <Text textAlign={"center"} color={useColorModeValue("gray.700", "gray.400")} px={3}>
            User Testing/Development
          </Text>
        </Box>

        <Box mx="4" maxW={"320px"} w={"full"} bg={useColorModeValue("white", "gray.900")} boxShadow={"2xl"} rounded={"lg"} p={6} textAlign={"center"}>
          <Avatar size={"xl"} src={"../public/img-prijun.jpg"} mb={4} />
          <Heading fontSize={"2xl"} fontFamily={"body"}>
            Prijun Koirala
          </Heading>
          <Text fontWeight={600} color={"gray.500"} mb={4}>
            kprijun@gmail.com
          </Text>
          <Text textAlign={"center"} color={useColorModeValue("gray.700", "gray.400")} px={3}>
            Main Developer
          </Text>
        </Box>
      </Flex>

      <Flex justifyContent={"flex-end"} mb={6}>
        <Box mx="4" maxW={"320px"} w={"full"} bg={useColorModeValue("white", "gray.900")} boxShadow={"2xl"} rounded={"lg"} p={6} textAlign={"center"}>
          <Avatar size={"xl"} src={"../public/img-tianyi.jpg"} mb={4} />
          <Heading fontSize={"2xl"} fontFamily={"body"}>
            Tianyi
          </Heading>
          <Text fontWeight={600} color={"gray.500"} mb={4}>
            tianyini@kth.se
          </Text>
          <Text textAlign={"center"} color={useColorModeValue("gray.700", "gray.400")} px={3}>
            Data/Development
          </Text>
        </Box>

        <Box mx="4" maxW={"320px"} w={"full"} bg={useColorModeValue("white", "gray.900")} boxShadow={"2xl"} rounded={"lg"} p={6} textAlign={"center"}>
          <Avatar size={"xl"} src={"../public/img-tingting.jpg"} mb={4} />
          <Heading fontSize={"2xl"} fontFamily={"body"}>
            Tingting
          </Heading>
          <Text fontWeight={600} color={"gray.500"} mb={4}>
            tinl@kth.se
          </Text>
          <Text textAlign={"center"} color={useColorModeValue("gray.700", "gray.400")} px={3}>
            UI/UX Design/Development
          </Text>
        </Box>

        <Box mx="4" maxW={"320px"} w={"full"} bg={useColorModeValue("white", "gray.900")} boxShadow={"2xl"} rounded={"lg"} p={6} textAlign={"center"}>
          <Avatar size={"xl"} src={"../public/img-xinyue.jpg"} mb={4} />
          <Heading fontSize={"2xl"} fontFamily={"body"}>
            Xinyue
          </Heading>
          <Text fontWeight={600} color={"gray.500"} mb={4}>
            xinyhu@kth.se
          </Text>
          <Text textAlign={"center"} color={useColorModeValue("gray.700", "gray.400")} px={3}>
            UI/UX Design/Development
          </Text>
        </Box>
      </Flex>
    </Box>
  )
}

const OurProject = () => {
  return (
    <Box className="left-container">
      <Heading>About Our Project</Heading>
    </Box>
  )
}

const PartnerLogos = () => {
  return (
    <Flex w="40%" display="flex" alignItems="center" justifyContent="space-between">
      <Image boxSize="100px" objectFit="cover" src="../public/img-slb.png" alt="Slb" />
      <Image boxSize="100px" objectFit="cover" src="../public/img-stockholm.png" alt="Stockholm Stad" />
      <Image boxSize="100px" objectFit="cover" src="../public/img-kth.png" alt="Kth" />
    </Flex>
  )
}

const AboutUs = () => {
  return (
    <Box>
      <Box className="main-container">
        <OurProject />
        <OurProfile />
      </Box>
      <PartnerLogos className="partner-logos" />
    </Box>
  )
}

export default AboutUs
