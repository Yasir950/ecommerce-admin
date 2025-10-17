import React from "react";
import Chart from "react-apexcharts";

const MonthlyOverviewChart = ({ data }) => {
  // Labels for x-axis
  const dates = data.map((item) => item._id);
  console.log(dates);
  // Chart configuration
  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "35%",
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: dates,
    },
    yaxis: [
      {
        title: { text: "Orders" },
      },
      {
        opposite: true,
        title: { text: "Sales (PKR)" },
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (val) => (val ? val.toLocaleString() : 0),
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "center",
    },
    colors: ["#00E396", "#008FFB"], // Orders (green), Sales (blue)
  };

  // Two data series: orders & sales
  const series = [
    {
      name: "Orders",
      data: data.map((item) => item.totalOrders),
    },
    {
      name: "Sales Amount",
      data: data.map((item) => item.totalSales),
    },
  ];

  return (
    <div>
      <Chart options={options} series={series} type="bar" height={400} />
    </div>
  );
};

export default MonthlyOverviewChart;
