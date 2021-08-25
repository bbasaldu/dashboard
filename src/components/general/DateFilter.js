import { useRef } from 'react';
import classes from './DateFilter.module.css'
const DateFilter = (props) => {
    const {data} = props;
    const fromRef = useRef()
    const toRef = useRef()
    // new Date("2020-01-01T00:00:00"),
    // new Date("2020-12-30T00:00:00"),
    const {onRangeChange} = props;
    const handleRangeChange = () => {
        // const firstElem = data[0]
        const fromArr = fromRef.current.value.split('/')
        console.log(fromArr)
        const from = new Date(`2020-${fromArr[0]}-${fromArr[1]}T00:00:00`)
        const toArr = toRef.current.value.split('/')
        const to = new Date(`2020-${toArr[0]}-${toArr[1]}T00:00:00`)
        // const t2 = new Date("2020-12-30T00:00:00")
        // const fromIndex = firstElem.pointData.findIndex(d => d.x.toString() === t.toString())
        // console.log(fromIndex)
        
        // const toIndex = firstElem.pointData.findIndex(d => d.x.toString() === t2.toString())
        // console.log(toIndex)
        // const newData = Array.from(data)
        // newData.forEach(d => {
        //     d.pointData = d.pointData.slice(fromIndex, toIndex)
        // })
        // console.log(newData)
        // const to = toRef.current.value.split('/')
        //const newData = data.filter()
        
        onRangeChange([from, to])
        //console.log(t.toString() === t2.toString())
    }
    return (
        <div className={classes.container}>
            <div>
                <span>From: </span>
                <input type="text" placeholder="mm/dd" ref={fromRef} defaultValue="01/01"/>
            </div>
            <div>
                <span>To: </span>
                <input type="text" placeholder="mm/dd" ref={toRef} defaultValue="12/30"/>
            </div>
            <button className={classes.btn} type="button" onClick={handleRangeChange}>Set Range</button>
        </div>
    )
}
export default DateFilter