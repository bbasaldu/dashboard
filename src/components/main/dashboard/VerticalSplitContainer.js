import classes from './VerticalSplitContainer.module.css'
const VerticalSplitContainer = (props) => {
    return (
        <div className={classes.container}>
            {props.children}
        </div>
    )
}
export default VerticalSplitContainer