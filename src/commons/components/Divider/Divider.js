import React from "react";
import T from "prop-types";
import styled from "styled-components/macro";

const Box = styled.div`
  height: 1px;
  width: calc(100% + 48px);
  margin: 0 -24px;
  background-color: var(--neutral-170);
  flex-shrink: 0;
`;

function Divider({ className }) {
  return <Box className={className} />;
}

Divider.propTypes = {
  className: T.string,
};

export default Divider;
