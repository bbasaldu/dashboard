import classes from './LevelOneContainer.module.css'
const LevelOneContainer = (props) => {
    return (
        <div className={`${classes.container} ${props.className}`}>
            {props.children}
        </div>
    )
}
export default LevelOneContainer