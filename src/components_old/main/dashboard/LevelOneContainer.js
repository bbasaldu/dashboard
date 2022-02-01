import classes from './LevelOneContainer.module.css'
const LevelOneContainer = (props) => {
    return (
        <div className={`${classes.container} ${(typeof props.className==='undefined')?'':props.className}`}>
            {props.children}
        </div>
    )
}
export default LevelOneContainer