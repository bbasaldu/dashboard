import cls from './ArrowValue.module.css'
const ArrowValue = (props) => {
    const {positive, value} = props
    return (
        <div className={`${cls.container} ${props.className}`}>
            <span>{value}</span>
            <div className={(positive?cls.arrowUp:cls.arrowDown)}></div>
        </div>
    )
}
export default ArrowValue