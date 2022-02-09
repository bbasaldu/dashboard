import { useState } from "react";
import Card from "../Card";
import Chart from "../Chart";
import ChartDropDown from "../ChartDropDown";
import TitleCard from "../TitleCard";
import { renderChart, updateData } from "./barchart";
import cls from "./BarChart.module.css";
//0 - alphabetically, 1 - ascending, 2 - descending
const options = ["Sort Alphabetically", "Sort Ascending", "Sort Descending"];
const rawData = [
  { label: "A", value: 10 },
  { label: "B", value: 15 },
  { label: "C", value: 20 },
  { label: "D", value: 10 },
  { label: "E", value: 13 },
  { label: "F", value: 4 },
  { label: "G", value: 16 },
];
const filterFunction = (data, opt) => {
  const temp = data.slice();
  if (opt === options[0]) {
    //sort abc
    temp.sort((a, b) => a.label.localeCompare(b.label));
  } else if (opt === options[1]) {
    //sort asc
    temp.sort((a, b) => a.value - b.value);
  } else if (opt === options[2]) {
    //sort desc
    temp.sort((a, b) => b.value - a.value);
  }
  return temp
};
const BarChart = () => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [data, setData] = useState(rawData);
  const handleSelectionChange = (opt) => {
    setSelectedOption(opt);
    setData(filterFunction(data, opt));
  };
  return (
    <Card>
      <TitleCard title="Max Value" value={20} />
      <ChartDropDown
        options={options.filter((opt) => opt !== selectedOption)}
        selected={selectedOption}
        onChange={handleSelectionChange}
      />

      <Chart
        className={cls.barChart}
        renderFunction={renderChart}
        data={data}
        updateFunction={updateData}
      />
    </Card>
  );
};
export default BarChart;
