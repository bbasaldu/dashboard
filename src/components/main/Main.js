import DashBoard from './dashboard/Dashboard'
import classes from './Main.module.css'
import SelectionBar from './SelectionBar'
const Main = () => {
    return (
        <div className={classes.main}>
           <SelectionBar/>
           <DashBoard/>
        </div>
    )
}
export default Main