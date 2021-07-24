import classes from './PercentChange.module.css'
const PercentChange = (props) => {
    const {positive, value} = props
    return (
        <div className={classes.container}>
            <span>{value}</span>
            <div className={(positive?classes.arrowUp:classes.arrowDown)}></div>
        </div>
    )
}
export default PercentChange