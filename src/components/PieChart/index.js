import Chart from "../Chart"
import { renderChart } from "./piechart"

const PieChart = (props) => {
    const {data, className} = props
    return (
        <Chart className={className} renderFunction={renderChart} data={data} />
    )
}
export default PieChart