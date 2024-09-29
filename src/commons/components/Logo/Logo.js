import React from "react";
import T from "prop-types";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import LogoSVG from "commons/images/logo.svg";

const LogoLink = styled(Link)`
  position: fixed;
  padding: 16px 24px;
  width: 100%;
  background-color: var(--background);
  z-index: var(--z-index-above);
`;

function Logo({ className, link }) {
  return (
    <LogoLink className={className} to={link}>
      <img src={LogoSVG} alt="AirAware logo" width={96} />
    </LogoLink>
  );
}

Logo.propTypes = {
  className: T.string,
  link: T.string,
};

export default Logo;
