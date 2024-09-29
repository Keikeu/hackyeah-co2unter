export const absorptions = {
  street_trees: {
    min: 0,
    max: 10000,
    step: 50,
    unit: "trees",
    average: 2000,
    factor: 18,
  },
  grasslands: {
    min: 0,
    max: 100,
    step: 1,
    unit: "hectares",
    average: 30,
    factor: 1600,
  },
  wetlands: {
    min: 0,
    max: 60,
    step: 1,
    unit: "hectares",
    average: 10,
    factor: 2400,
  },
  urban_trees: {
    min: 0,
    max: 4000,
    step: 100,
    unit: "trees",
    average: 1000,
    factor: 21.77,
  },
  urban_parks: {
    min: 0,
    max: 100,
    step: 1,
    unit: "hectares",
    average: 50,
    factor: 68,
  },
  urban_gardens: {
    min: 0,
    max: 4000,
    step: 50,
    unit: "m²",
    average: 1000,
    factor: 0.17,
  },
};

export const ABSORPTION_LABELS = {
  urban_trees: "Urban Trees",
  urban_parks: "Urban Parks",
  wetlands: "Wetlands",
  urban_gardens: "Urban Gardens",
  grasslands: "Grasslands",
  street_trees: "Street Trees",
};

export const ABSORPTION_COLORS = {
  urban_trees: "#4caf50",
  urban_parks: "#f2a5f5",
  wetlands: "#29b6f6",
  urban_gardens: "#5f4ad8",
  grasslands: "#8d6e63",
  street_trees: "#ef5350",
};
