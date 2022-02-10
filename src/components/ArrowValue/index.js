import Arrow from '../Arrow'
import cls from './ArrowValue.module.css'
const ArrowValue = (props) => {
    const {value} = props
    const positive = value>0?true:false
    return (
        <div className={`${cls.container} ${props.className}`}>
            <span>{`${value}% `}</span>
            <Arrow variant={positive?'up':'down'}/>
        </div>
    )
}
export default ArrowValue