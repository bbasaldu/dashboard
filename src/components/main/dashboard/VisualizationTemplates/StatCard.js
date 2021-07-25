import PercentChange from './PercentChange'
import classes from './StatCard.module.css'
const StatCard = (props) => {
    const {percentValue, value, positive} = props
    return (
        <div className={classes.container}>
            <div className={classes.top}>
                <span>Icon</span>
                <PercentChange value={percentValue} positive={positive} className={classes.flexEnd}/>
            </div>
            <div className={classes.middle}>
                <span>{value}</span>
            </div>
            <div className={classes.bottom}>
                <span>Title</span>
                <span>Icon</span>
            </div>
        </div>
    )

}
export default StatCard