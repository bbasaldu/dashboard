import classes from './QuadRowCard.module.css';
//assuming 4 divs will be in this card
const QuadRowCard = (props) => {
    return (
        <div className={classes.container}>
            {props.children}
        </div>
    )

}
export default QuadRowCard