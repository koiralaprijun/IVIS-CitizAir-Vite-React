import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, } from "@chakra-ui/react";

import "../src/css/AboutAirPollution.css";

export const ComparisonChart = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const data = {
      name: "root",
      children: [
        { name: "Human Hair", value: 70 },
        { name: "PM10", value: 10 },
        { name: "PM2.5", value: 5 },
      ],
    };

    const width = 600;
    const height = 300;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("text-anchor", "middle")

    const root = d3
      .hierarchy(data)
      .sum((d) => d.value)
      .sort((a, b) => b.value - a.value)

    const pack = d3.pack().size([width, height]).padding(5);

    pack(root);

    const node = svg
      .selectAll("g")
      .data(root.descendants().slice(1))
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    node
      .append("circle")
      .attr("r", (d) => d.r)
      .attr("fill", (d) => {
        if (d.data.name === "Human Hair") return "teal";
        if (d.data.name === "PM10") return "orange";
        if (d.data.name === "PM2.5") return "cyan";
        return "none"; // Fallback color
      });

    node
      .append("text")
      .text(d => d.data.name)
      .attr("dy", 4) // Slight adjustment to align text within the circle
      .style("font-size", (d) => {
        if (d.data.name === "Human Hair") return "18px"; // Increase font size for Human Hair
        if (d.data.name === "PM10" || d.data.name === "PM2.5") return "12px"; // Decrease font size for PM10 and PM2.5
        return "12px"; // Default font size
      });

    node
      .on("mouseover", function () {
        d3.select(this).select("circle").style("fill-opacity", 0.95);
      })
      .on("mouseout", function () {
        d3.select(this).select("circle").style("fill-opacity", 1);
      });

    return () => {
      // Clean up D3 elements if needed
    };
  }, []); // Empty dependency array to run only once

  return (
    <div id="comparision-chart">
      <svg ref={svgRef} />
    </div>
  );
};

const AirQualityIndex = () => {
  const categories = [
    {
      name: "Good",
      color: "#a8e05f",
      description:
        "Air quality is considered satisfactory, and air pollution poses little or no risk",
    },
    {
      name: "Moderate",
      color: "#fdd64b",
      description:
        "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.",
    },
    {
      name: "Unhealthy for Sensitive Groups",
      color: "#f99049",
      description:
        "Members of sensitive groups may experience health effects. The general public is not likely to be affected.",
    },
    {
      name: "Unhealthy",
      color: "#f65e5f",
      description:
        "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects",
    },
    {
      name: "Very Unhealthy",
      color: "#a070b6",
      description:
        "Health warnings of emergency conditions. The entire population is more likely to be affected."
    },
    {
      name: "Hazardous",
      color: "#a06a7b",
      description:
        "Health alert: everyone may experience more serious health effects",
    },
  ];

  return (
    <Stack spacing={4} align="stretch">
      <Heading as="h2" size="lg" p={4} bg="gray.100" textAlign="center">
        How good is the weather?
      </Heading>
      {categories.map((category, index) =>
        <Box key={index} bg={category.color} p={4} color="#3b3b3b">
          <Heading as="h3" size="md">
            {category.name}
          </Heading>
          <Text mt={2}>
            {category.description}
          </Text>
        </Box>
      )}
    </Stack>
  );
};

const UsefulLinks = () => {
  const links = [
    {
      title: "Air pollution: Impact and prevention",
      description:
        "Air pollution is becoming a major health problem affecting millions worldwide. In support of this observation, the World Health Organization estimates that every year, 2.4 million people die because of the effects of air pollution on health.",
      href: "https://onlinelibrary.wiley.com/doi/full/10.1111/j.1440-1843.2012.02213.x",
    },
    {
      title: "Health impact of air pollution to children",
      description:
        "Health impact of air pollution to children was studied over the last twenty years in heavily polluted parts of the Czech Republic during. The research program (Teplice Program) analyzed these effects in the polluted district Teplice (North Bohemia) and control district Prachatice (Southern Bohemia).",
      href: "https://www.sciencedirect.com/science/article/pii/S143846391200137X?casa_token=CJJf8x_puj4AAAAA:1eMZAZQKGVYpqDYxnbbT5aoxozcyhJdM1I8bD09gc6aa9bFqgypR67SrhvqVQ3O-61m2PNoiy8Y",
    },
    {
      title:
        "Public-health impact of outdoor and traffic-related air pollution: a European assessment",
      description:
        "Air pollution contributes to mortality and morbidity. We estimated the impact of outdoor (total) and traffic-related air pollution on public health in Austria, France, and Switzerland. Attributable cases of morbidity and mortality were estimated.",
      href: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(00)02653-2/abstract?cc=y%3D%5B%2Fquote%5D",
    },
    {
      title: "Human health effects of air pollution",
      description:
        "Over the past three or four decades, there have been important advances in the understanding of the actions, exposure-response characteristics, and mechanisms of action of many common air pollutants.",
      href: "https://ehp.niehs.nih.gov/doi/abs/10.1289/ehp.9310045",
    },
    {
      title: "Health Effects of Air Pollution: A Statistical Review",
      description:
        "We critically review and compare epidemiological designs and statistical approaches to estimate associations between air pollution and health.",
      href: "https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1751-5823.2003.tb00195.x?casa_token=CUzraUzgekAAAAAA:DjKITwAXfUWZ-ztmWrbqewc3NUlfIQjhpb0GKGeoksx5QJiN-xcwLzOS9xhQt1CK7hejKU4aahlR6aI",
    },
  ];

  return (
    <VStack spacing={5} align="stretch">
      <Heading as="h1" size="lg" paddingBottom={4}>
        Impact on Health
      </Heading>
      {links.map((link, index) => (
        <Box
          key={index}
          p={5}
          shadow="md"
          borderWidth="1px"
          borderRadius="md"
          backgroundColor="white"
        >
          <Heading as="h2" size="md" paddingBottom={3}>
            {link.title}
          </Heading>
          <Text paddingBottom={3}>{link.description}</Text>
          <Link href={link.href} isExternal>
            <Button colorScheme="blue">Learn More →</Button>
          </Link>
        </Box>
      ))}
    </VStack>
  );
};

const FAQAccordion = () =>
  <div>
    <Heading as="h3" size="md" my="4">
      Air Pollutants
    </Heading>
    <Accordion allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton _expanded={{ bg: "#3182CE", color: "white" }}>
            <Box as="span" flex="1" textAlign="left">
              What is PM?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h2>
          <AccordionButton _expanded={{ bg: "#3182CE", color: "white" }}>
            <Box as="span" flex="1" textAlign="left">
              What is O2?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h2>
          <AccordionButton _expanded={{ bg: "#3182CE", color: "white" }}>
            <Box as="span" flex="1" textAlign="left">
              What is NoX?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h2>
          <AccordionButton _expanded={{ bg: "#3182CE", color: "white" }}>
            <Box as="span" flex="1" textAlign="left">
              What is Birch Pollen?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h2>
          <AccordionButton _expanded={{ bg: "#3182CE", color: "white" }}>
            <Box as="span" flex="1" textAlign="left">
              What is AQI?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  </div>
)

const AboutAirPollution = () =>
  <Flex direction={{ base: "column", md: "row" }} justify="space-between" className="main-container">
    <Flex direction="column" className="first-col" p={4} flex="1">
      <ComparisonChart />
      <FAQAccordion className="faq-accordion" />
    </Flex>
    <Flex className="second-col" p={4} flex="1">
      <AirQualityIndex />
    </Flex>
    <Flex className="third-col" p={4} flex="1">
      <UsefulLinks />
    </Flex>
  </Flex>
);

export default AboutAirPollution;
