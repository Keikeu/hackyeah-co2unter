import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import drilldown from "highcharts/modules/drilldown";

drilldown(Highcharts);

const PieChart = () => {
  const options = {
    chart: {
      type: "pie",
      backgroundColor: "transparent",
    },
    tooltip: {
      valueSuffix: "%",
    },
    title: {
      text: "",
    },
    series: [
      {
        name: "Percentage",
        colorByPoint: true,
        data: [
          {
            name: "Energy",
            y: 73.2,
            drilldown: "energy",
          },
          {
            name: "Industry",
            y: 5.2,
            drilldown: "industry",
          },
          {
            name: "Waste",
            y: 3.2,
            drilldown: "waste",
          },
          {
            name: "Agriculture, Forestry & Land Use",
            y: 18.4,
            drilldown: "agriculture",
          },
        ],
      },
    ],
    drilldown: {
      series: [
        {
          id: "energy",
          name: "Percentage",
          data: [
            ["Energy in industry", 24.2],
            ["Energy in buildings (elec and heat)", 17.5],
            ["Transport", 16.2],
            ["Unallocated fuel combustion", 7.8],
            ["Fugitive emissions from energy", 5.8],
            ["Energy in Agri & Fishing", 1.7],
          ],
        },
        {
          id: "industry",
          name: "Percentage",
          data: [
            ["Cement", 3],
            ["Chemical & petrochemical (industrial)", 2.2],
          ],
        },
        {
          id: "waste",
          name: "Percentage",
          data: [
            ["Landfills", 1.9],
            ["Wastewater", 1.3],
          ],
        },
        {
          id: "agriculture",
          name: "Percentage",
          data: [
            ["Livestock & Manure", 5.8],
            ["Agricultural Soils", 4.1],
            ["Crop Burning", 3.5],
            ["Cropland", 1.4],
            ["Grassland", 0.1],
          ],
        },
      ],
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default PieChart;
