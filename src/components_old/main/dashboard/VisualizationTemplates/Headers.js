import classes from './Headers.module.css'
const Headers = (props) => {
    const {headers} = props
    return (
        <div className={classes.container}>
            {headers.map((h,i) => {
                return <span className={classes.header} key={`${h}_${i}`}>{h}</span>
            })}
        </div>
    )
}
export default Headers