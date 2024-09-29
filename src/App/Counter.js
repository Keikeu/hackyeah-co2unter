import Flexbox from "commons/components/Flexbox";
import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";

const Box = styled(Flexbox)`
  display: flex;
  justify-content: center;
`;

const Digit = styled.div`
  font-size: inherit;
  background-color: var(--neutral-100);
  color: var(--neutral-200);
  padding: 0 8px;
  margin: 2px 0;
  font-family: monospace;
  border: 1px solid var(--neutral-200);
`;

function Counter() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(val => Math.round(val + 187.1));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  function getDigitArray() {
    const array = [];

    for (let i = 1; i < 7; i++) {
      array.unshift(value.toString().slice(i * -1, i === 1 ? undefined : (i - 1) * -1) || "0");
    }

    return array;
  }

  return (
    <Box>
      {getDigitArray().map((digit, i) => (
        <Digit key={i}>{digit}</Digit>
      ))}
    </Box>
  );
}

export default Counter;
