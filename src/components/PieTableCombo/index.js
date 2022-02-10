import Card from '../Card'
import cls from './PieTableCombo.module.css'
const PieTableCombo = () => {
    return (
        <Card>
            <div className={cls.wrapper}>
                {/* title card here */}
                <div className={cls.split}>
                    {/* table here */}
                </div>
                <div className={cls.split}>
                    {/* pie chart here */}
                </div>
            </div>
        </Card>
    )
}
export default PieTableCombo