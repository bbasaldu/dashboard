import classes from './Table.module.css'
const Table = (props) => {
    return (
        <div className={`${classes.container} ${props.className}`}>
            {props.children}
        </div>
    )
}
export default Table