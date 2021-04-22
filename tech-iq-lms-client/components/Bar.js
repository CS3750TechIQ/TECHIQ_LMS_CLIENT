import React from "react";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";

const GraphStyles = styled.div`
  width: 75%;
  margin: auto;
`;

export default function BarGraph({ label, dataValues }) {
  console.log(dataValues);
  return (
    <GraphStyles>
      <Bar
        data={{
          labels: ["75+%", "50-75%", "25-50%", "0-25"],
          datasets: [
            {
              label: label,
              data: dataValues,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(153, 102, 255, 0.2)",
              ],
              borderColor: [
                "rgba(54, 162, 235, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        }}
        options={{
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        }}
      />
    </GraphStyles>
  );
}
