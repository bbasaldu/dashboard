import cls from './layouts.module.css'
const Layout = (props) => {
    return (
        <div className={cls.mainContent}>
            {props.children}
        </div>
    )
}
export default Layout