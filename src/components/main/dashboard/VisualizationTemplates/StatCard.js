import PercentChange from './PercentChange'
import classes from './StatCard.module.css'
import helpIcon from '../../../../assets/fi-rr-interrogation.svg'
const StatCard = (props) => {
    const {percentValue, value, positive, icon} = props
    return (
        <div className={classes.container}>
            <div className={classes.top}>
                {icon}
                <PercentChange value={percentValue} positive={positive} className={classes.flexEnd}/>
            </div>
            <div className={classes.middle}>
                <span>{value}</span>
            </div>
            <div className={classes.bottom}>
                <span>{props.children}</span>
                <img className={classes.helpIcon} src={helpIcon} alt="helpIcon"/>
            </div>
        </div>
    )

}
export default StatCard