import React from "react";
import T from "prop-types";
import styled, { css } from "styled-components/macro";
import Flexbox from "commons/components/Flexbox";
import Icon from "commons/components/Icon";
import Typography from "commons/components/Typography";

const HiddenInput = styled.input`
  visibility: hidden;
  position: absolute;
`;

const Check = styled.div`
  width: 16px;
  height: 16px;
  background-color: var(--neutral-200);
  border: 1px solid var(--neutral-170);
  border-radius: var(--border-radius-1);
  color: var(--neutral-200);
  font-size: 16px;
  flex-shrink: 0;
  margin-top: 2px; // 2px for text, 4px for tags

  ${({ isChecked }) =>
    isChecked &&
    css`
      border: none;
      background-color: var(--primary-100);
    `}

  ${({ isCrossed }) =>
    isCrossed &&
    css`
      border: none;
      background-color: var(--neutral-120);
    `}
`;

const FlexboxStyled = styled(Flexbox)`
  cursor: pointer;
  border-radius: var(--border-radius-2);
  width: fit-content;

  &:hover {
    ${Check} {
      ${({ isChecked }) => {
        if (isChecked)
          return css`
            background-color: var(--primary-90);
          `;
        else
          return css`
            border-color: var(--neutral-160);
          `;
      }}
    }
  }
`;

const Label = styled(Typography)`
  color: var(--neutral-100);
`;

function Checkbox({ className, isChecked = false, isCrossed = false, onChange = () => {}, label }) {
  function onChangeProxy() {
    if (onChange) onChange(isChecked, isCrossed);
  }

  return (
    <>
      <HiddenInput type="checkbox" checked={isChecked} onChange={onChangeProxy} />
      <FlexboxStyled
        className={className}
        onClick={onChangeProxy}
        alignItems="flex-start"
        gap={8}
        isChecked={isChecked}
      >
        <Check
          className="check"
          isChecked={isChecked}
          isCrossed={isCrossed}
          tabIndex="0"
          onKeyDown={e => {
            if (e.key === "Enter") onChangeProxy(e);
          }}
        >
          {isChecked && <Icon name="check" />}
          {isCrossed && <Icon name="close" />}
        </Check>
        {typeof label === "string" ? <Label variant="body">{label}</Label> : label}
      </FlexboxStyled>
    </>
  );
}

Checkbox.propTypes = {
  className: T.string,
  isChecked: T.bool,
  isCrossed: T.bool,
  onChange: T.func,
  label: T.oneOfType([T.object, T.string, T.node]).isRequired,
};

export default Checkbox;
