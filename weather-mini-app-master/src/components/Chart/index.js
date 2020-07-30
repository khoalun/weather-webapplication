import React from "react";
import { Bar } from "react-chartjs-2";
import forEach from "lodash/forEach";
import moment from "moment";

const Chart = ({ item }) => {
  console.log("item", item);

  const dataChart = () => {
    // const { temlist = [] } = item;
    let labels = [];
    let data = [];

    if (item.temlist) {
      forEach(item.temlist, e => {
        labels.push(moment(e.dt_txt).format("LTS"));
        data.push(e.main.temp);
      });
    }
    return {
      labels,
      datasets: [
        {
          label: item.date,
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data
        }
      ]
    };
  };

  console.log("filterData item ==>", dataChart());
  return (
    <div style={{ height: "150p" }}>
      <h2>Bar Weath ({item.date})</h2>
      <Bar
        data={dataChart()}
        width={100}
        height={50}
        options={{
          maintainAspectRatio: false
        }}
      />
    </div>
  );
};

export default Chart;
