import Card from "../Card";
import Chart from "../Chart";
import TitleCard from "../TitleCard";
import { renderChart } from "./barchart";
//0 - alphabetically, 1 - ascending, 2 - descending
const data = {
  order: 0
}
const BarChart = () => {
  return (
    <Card>
      <TitleCard title="Max Value" value={20}/>
      <Chart renderFunction={renderChart} data={data} />
    </Card>
  );
};
export default BarChart;
