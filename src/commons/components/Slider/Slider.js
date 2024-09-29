import React from "react";
import styled from "styled-components/macro";
import { Slider as MUISlider } from "@mui/material";
import T from "prop-types";

const StyledMUISlider = styled(MUISlider)`
  color: ${({ color }) => color};
  height: 8px;

  & .MuiSlider-rail {
    background-color: ${({ color }) => color};
  }
  & .MuiSlider-track {
    background-color: ${({ color }) => color};
    border: none;
  }
  & .MuiSlider-mark {
    height: 12px;
    width: 4px;
    background-color: ${({ color }) => color};
  }
  & .MuiSlider-markLabel {
    top: 26px;
    font-size: 12px;
  }
  & .MuiSlider-thumb {
    height: 24px;
    width: 24px;
    background-color: ${({ color }) => color};
    border: 2px solid ${({ color }) => color};

    &:focus,
    &:hover,
    &.Mui-active:hover,
    &.Mui-focusVisible {
      box-shadow: inherit;
    }
    &::before {
      display: none;
    }
  }

  & .MuiSlider-valueLabel {
    line-height: 1.2;
    font-size: 12px;
    background: unset;
    padding: 0;
    width: 32px;
    height: 32px;
    border-radius: 50% 50% 50% 0;
    background-color: ${({ color }) => color};
    transform-origin: bottom left;
    transform: translate(50%, -100%) rotate(-45deg) scale(0);

    &::before {
      display: none;
    }

    &.MuiSlider-valueLabelOpen {
      transform: translate(50%, -100%) rotate(-45deg) scale(1);
    }
    & > * {
      transform: rotate(45deg);
    }
  }
`;

function Slider({ color = "var(--primary-100)", ...props }) {
  return <StyledMUISlider {...props} color={color} />;
}

Slider.propTypes = {
  color: T.string,
};

export default Slider;
