import Card from "../Card";
import QuadStat from "./QuadStat";
import cls from "./QuadStats.module.css";
const QuadStats = () => {
  return (
    <Card className={cls.cardClass}>
      <div className={cls.row}>
        <QuadStat
          title="Monthly Visitors"
          lastValue="200"
          value="320K"
          percentValue={2.1}
        />
        <QuadStat
          title="Monthly Visitors"
          lastValue="200"
          value="320K"
          percentValue={2.1}
        />
      </div>
      <div className={cls.row}>
        <QuadStat
          title="Monthly Visitors"
          lastValue="200"
          value="320K"
          percentValue={2.1}
        />
        <QuadStat
          title="Monthly Visitors"
          lastValue="200"
          value="320K"
          percentValue={2.1}
        />
      </div>
    </Card>
  );
};
export default QuadStats;
