import React, { useState } from "react";
import Flexbox from "commons/components/Flexbox";
import Counter from "./Counter";
import styled from "styled-components";
import CircleRenderer from "./CircleRenderer";
import { emissions as mockEmissions, EMISSION_LABELS, EMISSION_COLORS } from "data/mock-emissions";
import { absorptions as mockAbsorptions, ABSORPTION_LABELS, ABSORPTION_COLORS } from "data/mock-absorptions";
import PieChart from "./PieChart";
import SectionHeader from "./SectionHeader";
import Typography from "commons/components/Typography";
import city from "commons/images/city.png";
import city2 from "commons/images/city2.png";
import Logo from "commons/components/Logo";
import Comparison from "./Comparison";
import AnimatedSectionHeader from "./AnimatedSectionHeader";

const Box = styled(Flexbox)`
  position: relative;
  max-width: 640px;
  margin: 0 auto;
`;

const Section = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 30%;
`;

const CityImage = styled.img`
  position: absolute;
  width: 100%;
  height: auto;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 45%);
  z-index: var(--z-index-below);
  object-fit: cover;
`;

const FooterImage = styled.div`
  width: calc(100% + 48px);
  height: 300px;
  margin-left: -24px;
  background-size: contain;
  background-position: center;
  background-attachment: fixed;
`;

function Home() {
  const [emissions, setEmissions] = useState(
    Object.entries(mockEmissions).map(([key, properties]) => ({
      label: EMISSION_LABELS[key],
      color: EMISSION_COLORS[key],
      value: properties.average,
      ...properties,
    }))
  );

  const [absorptions, setAbsorptions] = useState(
    Object.entries(mockAbsorptions).map(([key, properties]) => ({
      label: ABSORPTION_LABELS[key],
      color: ABSORPTION_COLORS[key],
      value: properties.average,
      ...properties,
    }))
  );

  const emissionsVsAbsorption = [
    {
      color: "#fc8b7f",
      factor: 1,
      label: "Emissions",
      value: 5900000,
    },
    {
      color: "#56b344",
      factor: 1,
      label: "Absorption",
      value: 36000,
    },
  ];

  return (
    <>
      <Logo />
      <Box flexDirection="column" paddingX={24}>
        <Section>
          <AnimatedSectionHeader>
            Since you’ve entered this page, the city of Kraków has emitted <Counter /> kg of CO2.
          </AnimatedSectionHeader>
          <CityImage src={city} alt="Isometric city illustration" />
        </Section>

        <AnimatedSectionHeader>That’s 5.9 million tonnes of CO2 annually.</AnimatedSectionHeader>

        <SectionHeader>Breakdown of the major sources of Kraków’s emissions.</SectionHeader>
        <PieChart />

        <SectionHeader>How would changes in your daily routine affect these emissions?</SectionHeader>
        <CircleRenderer circles={emissions} setCircles={setEmissions} maxValue={11550} showTitle />

        <SectionHeader>How many trees would it take to offset the emissions above?</SectionHeader>
        <Comparison emissions={emissions} />

        <SectionHeader>Kraków’s green spaces help absorb some of these emissions.</SectionHeader>
        <CircleRenderer circles={absorptions} setCircles={setAbsorptions} maxValue={180000} />

        <SectionHeader>But how much is absorbed?</SectionHeader>
        <CircleRenderer circles={emissionsVsAbsorption} maxValue={4000000} />

        <Typography variant="paragraph" marginTop={24} marginBottom={72}>
          That small green dot represents the estimated CO2 absorption. It’s clear the city’s absorption is far from
          offsetting its emissions.
        </Typography>

        <FooterImage style={{ backgroundImage: `url(${city2})` }} />

        <Typography variant="h3" marginTop={56}>
          Summary
        </Typography>
        <Typography variant="paragraph" marginTop={24} marginBottom={56}>
          This page underscores the urgent need to reduce Kraków’s CO2 emissions, with a particular focus on the energy
          sector. While green spaces and tree planting play a role in absorbing emissions, the real solution lies in
          significantly limiting emissions at the source. Shifting toward green energy is crucial to making the biggest
          impact. Together, we can work toward a more sustainable future by reducing energy consumption and choosing
          renewable alternatives.
        </Typography>
      </Box>
    </>
  );
}

export default Home;
