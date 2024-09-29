import React, { useState } from "react";
import Flexbox from "commons/components/Flexbox";
import Counter from "./Counter";
import styled from "styled-components";
// import Modal from "commons/components/Modal";
// import Button from "commons/components/Button";
import CircleRenderer from "./CircleRenderer";
import { emissions as mockEmissions, EMISSION_LABELS, EMISSION_COLORS } from "data/mock-emissions";
import { absorptions as mockAbsorptions, ABSORPTION_LABELS, ABSORPTION_COLORS } from "data/mock-absorptions";
import PieChart from "./PieChart";
import SectionHeader from "./SectionHeader";

const Box = styled(Flexbox)``;

const Section = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 30%;
`;

const CityImage = styled.img`
  position: absolute;
  width: 100%;
  max-width: 600px;
  height: auto;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 45%);
  z-index: var(--z-index-below);
  /* background-image: url("./city.png"); */
  /* background-size: cover; */
  /* background-position: center; */
  object-fit: cover;
`;

const FooterImage = styled.img`
  width: calc(100% + 48px);
  height: auto;
  transform: translateX(-24px);
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

  return (
    <Box flexDirection="column" paddingX={24}>
      <Section>
        <SectionHeader>
          Since you&apos;ve entered this page, the city of Kraków has emitted <Counter /> kg of CO2.
        </SectionHeader>
        <CityImage src="./city.png" alt="" />
      </Section>

      <Section>
        <SectionHeader>That&apos;s 5.9 million tonnes of CO2 annually.</SectionHeader>
      </Section>

      <Section>
        <SectionHeader>Here&apos;s a breakdown of the major contributors to the city&apos;s emissions.</SectionHeader>
        <PieChart />
      </Section>

      <Section>
        <SectionHeader>How would changes in your daily life affect these emissions?</SectionHeader>
        <CircleRenderer circles={emissions} setCircles={setEmissions} maxValue={11550} showTitle />
      </Section>

      <Section>
        <SectionHeader>The green spaces in Kraków help absorb some of our emissions.</SectionHeader>
        <CircleRenderer circles={absorptions} setCircles={setAbsorptions} maxValue={180000} />
      </Section>

      <Section>
        <SectionHeader>
          What could the future of Kraków look like? Let&apos;s simulate some possibilities.
        </SectionHeader>
      </Section>
      <FooterImage src="./city2.png" alt="" />
    </Box>
  );
}

export default Home;
