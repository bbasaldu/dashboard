import { useEffect, useRef, useState } from 'react'
import classes from './DropDownMenu.module.css'
const dataChangeEvent = new Event('dataChange')
const DropDownMenu = (props) => {
    const btnRef = useRef()
    const allOptions = props.options
    const [currOption, setCurrOption] = useState(allOptions[0])
    const [options, setOptions] = useState(allOptions.filter(d => d!==currOption))
    const [showOptions, setShowOptions] = useState(false)
    useEffect(() => {
        setOptions(allOptions.filter(d => d!== currOption))
        btnRef.current.dispatchEvent(dataChangeEvent);
    }, [currOption, allOptions])
    const handleClick = () => {
        setShowOptions(last => !last)
    }
    const selectOption = (ev) => {
        setCurrOption(ev.target.innerHTML)
        setShowOptions(last => !last)
    }
    return (
        <div className={classes.container}>
            <button className={classes.btn} type="button" onClick={handleClick} ref={btnRef} id={`${props.id}_dropdown`}>{currOption}</button>
            <ul className={classes.options} style={{visibility:(showOptions?"visible":"hidden")}}>
            {options.map((opt, i) => {
                return <li onClick={selectOption} key={`dropDownElem${i}`}>{opt}</li>
            })}
            </ul>
        </div>
    )
}
export default DropDownMenu