import { Fragment, useEffect } from "react"
import classes from './LineChart.module.css'
import { buildLineChart } from "./d3Scripts/buildLineChart.js"
const LineChart= (props) => {
    //emulate theme state
    
    
    useEffect(() => {
        const theme = {
            first: 'steelblue',
            second: '#C0C0C0',
            third: '#2cd9d0'
        }
        const options = {
            theme
        }
        buildLineChart(props.id, props.data, options)
    },[props])
    return (
        <div className={classes.container} id={props.id}>
            <div className={classes.tooltip} id={`${props.id}_tooltip`}>
                <div className={classes.tooltipArrow} id={`${props.id}_tooltip_arrow`}></div>
                <div className={classes.tooltipInner} id={`${props.id}_tooltip_value`}></div>
                <div className={classes.tooltipinner} id={`${props.id}_tooltip_desc`}></div>
                
            </div>
        </div>
    )
}
export default LineChart