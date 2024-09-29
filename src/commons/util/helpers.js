export function normalizeEmissions(emission, min, max) {
  return ((emission - min) / (max - min)) * 80 + 1;
}

export function formatCO2(kgValue) {
  const tonnes = kgValue / 1000; // 1 tonne = 1000 kg
  const megaTonnes = kgValue / 1e6; // 1 megatonne = 1,000,000 kg
  const gigaTonnes = kgValue / 1e9; // 1 gigatonne = 1,000,000,000 kg
  const teraTonnes = kgValue / 1e12; // 1 teratonne = 1,000,000,000,000 kg

  // Determine the output format based on thresholds
  if (kgValue < 1000) {
    return `${Math.round(kgValue * 100) / 100} kg CO2`;
  } else if (kgValue < 1e6) {
    return `${Math.round(tonnes * 100) / 100} t CO2`;
  } else if (kgValue < 1e9) {
    return `${Math.round(megaTonnes * 100) / 100} Mt CO2`;
  } else if (kgValue < 1e12) {
    return `${Math.round(gigaTonnes * 100) / 100} Gt CO2`;
  } else {
    return `${Math.round(teraTonnes * 100) / 100} Tt CO2`;
  }
}

function convertValueToPixels(value) {
  if (!value) return 0;
  if (typeof value === "number") {
    return `${value}px`;
  } else return value;
}

export function calculateSpacingValue(
  spacing = 0,
  spacingTop,
  spacingRight,
  spacingBottom,
  spacingLeft,
  spacingX,
  spacingY
) {
  if (spacing && typeof spacing === "string" && spacing.includes(" ")) {
    return spacing;
  }

  const spacingArray = new Array(4).fill(convertValueToPixels(spacing));

  if (spacingTop !== undefined) {
    spacingArray[0] = convertValueToPixels(spacingTop);
  }
  if (spacingRight !== undefined) {
    spacingArray[1] = convertValueToPixels(spacingRight);
  }
  if (spacingBottom !== undefined) {
    spacingArray[2] = convertValueToPixels(spacingBottom);
  }
  if (spacingLeft !== undefined) {
    spacingArray[3] = convertValueToPixels(spacingLeft);
  }
  if (spacingX !== undefined) {
    spacingArray[1] = convertValueToPixels(spacingX);
    spacingArray[3] = convertValueToPixels(spacingX);
  }
  if (spacingY !== undefined) {
    spacingArray[0] = convertValueToPixels(spacingY);
    spacingArray[2] = convertValueToPixels(spacingY);
  }

  if (!spacingArray.filter(Boolean).length) return null;

  return spacingArray.join(" ");
}
