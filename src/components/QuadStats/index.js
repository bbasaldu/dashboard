import Card from "../Card";
import QuadStat from "./QuadStat";
import cls from "./QuadStats.module.css";
const QuadStats = () => {
  return (
    <Card className={cls.cardClass}>
      <div className={cls.row}>
        <QuadStat />
        <QuadStat />
      </div>
      <div className={cls.row}>
        <QuadStat />
        <QuadStat />
      </div>
    </Card>
  );
};
export default QuadStats;
