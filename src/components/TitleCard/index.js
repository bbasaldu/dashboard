import cls from './TitleCard.module.css'
import { format } from 'd3'
const TitleCard = (props) => {
    const {title=false, value=false} = props
    return (
        <div className={cls.titleCardWrapper}>
            {title && <div className={[cls.titleCardText].join(' ')}>{title}</div>}
            {value && <div className={[cls.titleCardText].join(' ')}>{format(',')(Math.round(value))}</div>}
        </div>
    )
}
export default TitleCard