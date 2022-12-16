// components/BarChart.js
import { useState, React, useEffect } from "react";
import { Bar } from "react-chartjs-2";
export const BarChart = (props) => {
  // console.log(props);
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
      <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
      <Bar
        height="400px"
        width="600px"
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Expenses in respective categories",
            },
            legend: {
              display: false,
            },
          },
          // maintainAspectRatio: false,
        }}
      />
    </div>
  );
};
