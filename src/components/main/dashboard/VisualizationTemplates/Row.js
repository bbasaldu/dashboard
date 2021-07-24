import classes from './Row.module.css'
const Row = (props) => {
    const {data} = props
    return (
        <div className={classes.container}>
            {data.map((d,i) => {
                return <span className={classes.row} key={`${data[0]}_${i}`}>{d}</span>
            })}
            {props.children}
        </div>
    )
}
export default Row