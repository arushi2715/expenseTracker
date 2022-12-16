import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

function PieChart(props) {
  const [chartData, setChartData] = useState({
    labels: props.chartLabel,
    datasets: [
      {
        label: "Total Expenditure ",
        data: props.chartValues,
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        // base:100,
        // barPercentage: 0.5,
        // barThickness: 6,
        // maxBarThickness: 8,
        // minBarLength: 2,
        borderColor: "black",
        borderWidth: 2,
        offset: true,
      },
    ],
  });
  useEffect(() => {
    let obj = {
      labels: props.chartLabel,
      datasets: [
        {
          label: "Total Expenditure ",
          data: props.chartValues,
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    };
    setChartData(obj);
  }, [props]);
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Pie Chart</h2>
      <Pie
        height="300px"
        width="400px"
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Expenses in Respective categories",
            },
          },
        }}
      />
    </div>
  );
}
export default PieChart;
