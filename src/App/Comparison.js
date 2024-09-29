import Flexbox from "commons/components/Flexbox";
import React from "react";
import T from "prop-types";
import styled from "styled-components/macro";

const Box = styled(Flexbox)`
  position: relative;
  overflow-x: auto;
`;

const Table = styled.table`
  width: fit-content;

  th,
  td {
    min-width: 130px;
  }

  td {
    white-space: nowrap;
  }

  tr {
    height: 40px;
  }
`;

const trees = [
  {
    label: "100-Year-Old Trees",
    yearlyAbsorption: 60,
  },
  {
    label: "35-Year-Old Trees",
    yearlyAbsorption: 25,
  },
  {
    label: "Small Seedlings",
    yearlyAbsorption: 5,
  },
  {
    label: "Park Jordana",
    yearlyAbsorption: 68 * 26,
  },
];

function Comparison({ emissions }) {
  function calculateCount(emission, tree) {
    const emitted = emission.value * emission.factor;
    const absorbed = tree.yearlyAbsorption;

    const value = emitted / absorbed;

    return value < 1 ? value.toFixed(2) : Math.ceil(value);
  }

  return (
    <Box>
      <Table>
        <thead>
          <tr>
            <th>Source</th>
            {trees.map(tree => (
              <th key={tree.label}>{tree.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {emissions.map(emission => (
            <tr key={emission.label}>
              <td>{emission.label}</td>
              {trees.map(tree => (
                <td style={{ textAlign: "center" }} key={tree.label}>
                  {calculateCount(emission, tree)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
  );
}

Comparison.propTypes = {
  emissions: T.array,
};

export default Comparison;
