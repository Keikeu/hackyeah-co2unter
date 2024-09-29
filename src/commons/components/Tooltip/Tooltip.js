import React, { useState } from "react";
import T from "prop-types";
import styled, { css } from "styled-components/macro";
import Typography from "../Typography";

const Arrow = styled.div`
  visibility: hidden;

  &,
  &:before {
    position: absolute;
    width: 8px;
    height: 8px;
  }

  &:before {
    content: "";
    visibility: hidden;
    background-color: var(--neutral-100);
    transform: rotate(45deg);
  }

  ${({ placement }) => {
    if (placement === "top") {
      return css`
        bottom: -4px;
        left: 50%;
        transform: translateX(-50%);
      `;
    }

    if (placement === "bottom") {
      return css`
        top: -4px;
        left: 50%;
        transform: translateX(-50%);
      `;
    }

    if (placement === "left") {
      return css`
        right: -4px;
        top: 50%;
        transform: translateY(-50%);
      `;
    }

    if (placement === "right") {
      return css`
        left: -4px;
        top: 50%;
        transform: translateY(-50%);
      `;
    }
  }};
`;

const Box = styled.div`
  position: fixed;
  background-color: var(--neutral-100);
  padding: 4px 8px;
  border-radius: var(--border-radius-1);
  z-index: var(--z-index-inf);
  max-width: 200px;
  white-space: pre-wrap;
  visibility: hidden;

  ${({ visible }) =>
    visible &&
    css`
      visibility: visible;

      ${Arrow}:before {
        visibility: visible;
      }
    `}

  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
`;

const TypographyStyled = styled(Typography)`
  font-weight: 500;
`;

const OFFSET = 8;

function Tooltip({ className, children, label, placement = "top", triggerStyles }) {
  const [visible, setVisible] = useState(false);
  const [triggerElement, setTriggerElement] = useState(null);
  const [tooltipElement, setTooltipElement] = useState(null);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  const showTooltip = () => {
    if (!visible && label) {
      const triggerRect = triggerElement.getBoundingClientRect();
      const tooltipRect = tooltipElement.getBoundingClientRect();
      const { top, left, width: triggerWidth, height: triggerHeight } = triggerRect;
      const { width: tooltipWidth, height: tooltipHeight } = tooltipRect;

      let tooltipTop;
      let tooltipLeft;

      if (placement === "top") {
        tooltipTop = top - tooltipHeight - OFFSET;
        tooltipLeft = left - tooltipWidth / 2 + triggerWidth / 2;
      } else if (placement === "bottom") {
        tooltipTop = top + triggerHeight + OFFSET;
        tooltipLeft = left - tooltipWidth / 2 + triggerWidth / 2;
      } else if (placement === "left") {
        tooltipTop = top - tooltipHeight / 2 + triggerHeight / 2;
        tooltipLeft = left - tooltipWidth - OFFSET;
      } else if (placement === "right") {
        tooltipTop = top - tooltipHeight / 2 + triggerHeight / 2;
        tooltipLeft = left + triggerWidth + OFFSET;
      }

      setTop(tooltipTop);
      setLeft(tooltipLeft);

      setVisible(true);
    }
  };

  const hideTooltip = () => {
    if (visible) {
      setVisible(false);
    }
  };

  return (
    <>
      <span
        ref={setTriggerElement}
        onMouseEnter={showTooltip}
        onFocus={showTooltip}
        onMouseLeave={hideTooltip}
        onBlur={hideTooltip}
        style={triggerStyles}
      >
        {children}
      </span>

      <Box className={className} visible={visible} placement={placement} top={top} left={left} ref={setTooltipElement}>
        <TypographyStyled variant="label" color="neutral-200">
          {label}
        </TypographyStyled>
        <Arrow placement={placement} />
      </Box>
    </>
  );
}

Tooltip.propTypes = {
  className: T.string,
  children: T.oneOfType([T.object, T.string, T.node]),
  label: T.string,
  placement: T.oneOf(["top", "bottom", "left", "right"]),
  triggerStyles: T.object,
};

export default Tooltip;
