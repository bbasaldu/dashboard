import Chart from "../Chart";
import { renderChart, updateData } from "./multiLineChart";

const MultiLineChart = (props) => {
  const { data, className } = props;
  return (
    <Chart className={className} renderFunction={renderChart} updateFunction={updateData} data={data} />
  );
};
export default MultiLineChart;
