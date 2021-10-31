import cls from './SelectorButton.module.css'
const SelectorButton = (props) => {
    return (
        <button type="button" className={cls.wrapper}>
            {props.children}
        </button>
    )
}
export default SelectorButton