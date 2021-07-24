import classes from './TitleCard.module.css'
const TitleCard = (props) => {
    return (
        <div className={classes.container}>
            <div>{props.title}</div>
            <div>{props.value}</div>
        </div>
    )
}
export default TitleCard