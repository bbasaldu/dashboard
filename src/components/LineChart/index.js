import Card from "../Card";
import Chart from "../Chart";
import TitleCard from "../TitleCard";
import { renderChart } from "./linechart";
const data = [];
let count = 1;
for (let i = 1; i <= 12; i++) {
  for (let j = 1; j <= 30; j++) {
    if (i === 2 && j === 30) continue; //feb with day 30 yields an invalid date object
    const month = i < 10 ? `0${i}` : i;
    const day = j < 10 ? `0${j}` : j;
    const date = {
      x: new Date(`2020-${month}-${day}T00:00:00`),
      y: Math.pow(count, 3),
    };
    data.push(date);
    count += 0.1;
  }
}
console.log(data);
const LineChart = () => {
  return (
    <Card>
      <TitleCard title="Year Total" value={data[data.length-1].y}/>
      <Chart renderFunction={renderChart} data={data} />
    </Card>
  );
};
export default LineChart;
