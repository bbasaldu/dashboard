import cls from './Item.module.css'
const Item = (props) => {
    const {imgSrc} = props;
    
    return (
        <div className={cls.item}>
            
            <div className={cls.left}>
                <img  alt="defaultIcon" src={imgSrc} />
            </div>
            <div className={cls.right}>{props.children}</div>
        </div>
    )
}
export default Item