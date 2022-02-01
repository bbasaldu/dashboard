import useMediaQuery from '../../hooks/useMediaQuery'
import DashBoard from './dashboard/Dashboard'
import classes from './Main.module.css'
import SelectionBar from './SelectionBar'
const mobileStyles = {
    marginLeft: '0px',
    width: '200vw'
}
const largeStyles = {
    marginLeft: '15vw',
    width: '85vw'
}
const Main = () => {
    const matches = useMediaQuery("(max-width: 600px)");
    return (
        <div className={classes.main}>
           <SelectionBar/>
           <DashBoard/>
        </div>
    )
}
export default Main