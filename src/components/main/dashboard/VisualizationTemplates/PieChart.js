import { useEffect } from 'react'
import { buildPieChart } from './d3Scripts/buildPieChart'
import classes from './PieChart.module.css'
const PieChart = (props) => {
    
    useEffect(() => {
        buildPieChart(props.id, props.data,)
    },[props])
    return (
        <div className={classes.container} id={props.id}>
            
        </div>
    )
}
export default PieChart