import classes from './TitleCard.module.css'
const TitleCard = (props) => {
    return (
        <div className={`${classes.container} ${(typeof props.className==='undefined')?'':props.className}`}>
            <div>{props.title}</div>
            <div>{props.value}</div>
        </div>
    )
}
export default TitleCard