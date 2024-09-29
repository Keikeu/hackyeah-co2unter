import React from "react";
import T from "prop-types";
import Icon from "commons/components/Icon";
import Typography from "commons/components/Typography";
import styled, { css } from "styled-components/macro";

const Box = styled.div``;

const HiddenInput = styled.input`
  position: absolute;
  visibility: hidden;
`;

const VisibleInput = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 8px;
  gap: 12px;
  background: var(--primary-190);
  border-radius: var(--border-radius-1);

  ${({ size }) =>
    size === "small" &&
    css`
      padding: 2px 4px;
      gap: 4px;
    `}
`;

const StepperButton = styled.button`
  background-color: var(--neutral-200);
  border-radius: 50%;
  padding: 0;
  color: var(--primary-100);

  &:hover,
  &:focus-visible {
    box-shadow: var(--shadow-1);
  }

  &:disabled {
    pointer-events: none;
    background-color: transparent;
    color: var(--primary-140);
  }
`;

const ValueTypography = styled(Typography)`
  width: 20px;
  font-weight: 500;
  text-align: center;
  color: var(--primary-100);
`;

function NumberStepper({ className, min = 1, max = 100, step = 1, value = 1, onChange, onClick, size = "medium" }) {
  function stepUp() {
    if (value + step > max) return;
    onChange(value + step);
  }

  function stepDown() {
    if (value - step < min) return;
    onChange(value - step);
  }

  return (
    <Box className={className} onClick={onClick}>
      <HiddenInput type="number" min={min} max={max} step={step} value={value} onChange={onChange} />
      <VisibleInput size={size}>
        {/* disabled state */}
        <StepperButton type="button" onClick={stepDown} disabled={value === min}>
          <Icon name="remove" size={size === "medium" ? 20 : 16} />
        </StepperButton>
        <ValueTypography variant={size === "small" ? "label" : "body"}>{value}</ValueTypography>
        <StepperButton type="button" onClick={stepUp} disabled={value === max}>
          <Icon name="add" size={size === "medium" ? 20 : 16} />
        </StepperButton>
      </VisibleInput>
    </Box>
  );
}

NumberStepper.propTypes = {
  className: T.string,
  min: T.number,
  max: T.number,
  step: T.number,
  value: T.number,
  onChange: T.func.isRequired,
  onClick: T.func,
  size: T.oneOf(["medium", "small"]),
};

export default NumberStepper;
