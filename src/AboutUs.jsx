import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  useColorModeValue,
  Flex
} from "@chakra-ui/react"

const OurProfile = () => {
  return (
    <Center py={6} mx="auto" my="0">
      <Box
        mx="4"
        maxW={"320px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Avatar size={"xl"} src={"../public/img-jordan.jpg"} mb={4} />
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          Jordan
        </Heading>
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          jyjchian@kth.se
        </Text>
        <Text
          textAlign={"center"}
          color={useColorModeValue("gray.700", "gray.400")}
          px={3}
        >
          45 Year experience in design industry. Looking for internship.
        </Text>
      </Box>

      <Box
        mx="4"
        maxW={"320px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Avatar size={"xl"} src={"../public/img-prijun.jpg"} mb={4} />
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          Prijun Koirala
        </Heading>
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          kprijun@gmail.com
        </Text>
        <Text
          textAlign={"center"}
          color={useColorModeValue("gray.700", "gray.400")}
          px={3}
        >
          45 Year experience in design industry. Looking for internship.
        </Text>
      </Box>

      <Box
        mx="4"
        maxW={"320px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Avatar size={"xl"} src={"../public/img-tianyi.jpg"} mb={4} />
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          Tianyi
        </Heading>
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          tianyini@kth.se
        </Text>
        <Text
          textAlign={"center"}
          color={useColorModeValue("gray.700", "gray.400")}
          px={3}
        >
          45 Year experience in design industry. Looking for internship.
        </Text>
      </Box>

      <Box
        mx="4"
        maxW={"320px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Avatar size={"xl"} src={"../public/img-tingting.jpg"} mb={4} />
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          Tingting
        </Heading>
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          tinl@kth.se
        </Text>
        <Text
          textAlign={"center"}
          color={useColorModeValue("gray.700", "gray.400")}
          px={3}
        >
          45 Year experience in design industry. Looking for internship.
        </Text>
      </Box>

      <Box
        mx="4"
        maxW={"320px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Avatar size={"xl"} src={"../public/img-xinyue.jpg"} mb={4} />
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          Xinyue
        </Heading>
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          xinyhu@kth.se
        </Text>
        <Text
          textAlign={"center"}
          color={useColorModeValue("gray.700", "gray.400")}
          px={3}
        >
          45 Year experience in design industry. Looking for internship.
        </Text>
      </Box>
    </Center>
  )
}

const AboutUs = () =>
  <Flex>
    <OurProfile />
  </Flex>

export default AboutUs
