import classes from './ToolTip.module.css'
const ToolTip = (props) => {

    return (
        <div className={classes.container} id={props.id}>
            {props.children}
        </div>
    )
}
export default ToolTip