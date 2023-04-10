import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";
import "./Pie.css";
import { StatiscalGD, StatiscalSK } from "../../component/reudux/selector";
import { useSelector } from "react-redux";
const PieChart = () => {
  const Gd = useSelector(StatiscalGD);
  const SK = useSelector(StatiscalSK);

  console.log(Gd); // const series = [56024, 18568];
  const optionsSK: ApexOptions = {
    chart: {
      width: 400,
      type: "donut",
    },
    labels: ["Vé đã sử dụng", "Vé chưa sử dụng"],
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 400,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    dataLabels: {
      enabled: false,
      formatter: function (series) {
        return series + "%";
      },
    },
  };

  const optionsGD: ApexOptions = {
    chart: {
      width: 400,
      type: "donut",
    },
    labels: ["Vé đã sử dụng", "Vé chưa sử dụng"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 400,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    dataLabels: {
      enabled: false,
      formatter: function (series) {
        return series + "%";
      },
      enabledOnSeries: undefined,
    },
  };
  return (
    <div className="pie-chart">
      <div>
        <h4 style={{ textAlign: "center" }}>Gói Sự Kiện</h4>
        <ReactApexChart
          options={optionsSK}
          series={SK}
          type="donut"
          width={290}
        />
      </div>
      <div>
        <h4 style={{ marginLeft: 50 }}>Gói Gia Đình</h4>
        <ReactApexChart
          options={optionsGD}
          series={Gd}
          type="donut"
          width={400}
        />
      </div>
    </div>
  );
};

export default PieChart;
