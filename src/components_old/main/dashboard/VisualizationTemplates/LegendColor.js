import classes from './LegendColor.module.css'
const LegendColor = (props) => {
    const {color} = props
    return (
        <div className={classes.container} style={{backgroundColor:color}}>
        </div>
    )
}
export default LegendColor