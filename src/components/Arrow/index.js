import cls from './Arrow.module.css'
const Arrow = (props) => {
    const {variant='up', className=null} = props
    return (
        <div className={[
            (variant==='up'?cls.arrowUp:cls.arrowDown),
            className?className:''
        ].join(' ')}></div>
    )
}
export default Arrow