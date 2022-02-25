import Card from "../Card";
import QuadStat from "./QuadStat";
import cls from "./QuadStats.module.css";
import bookIcon from '../../assets/fi-rr-book.svg'
const QuadStats = () => {
  return (
    <Card className={cls.cardClass}>
      <div className={cls.row}>
        <QuadStat
          title="Rate of something"
          lastValue="43.19"
          value="43.40%"
          percentValue={12}
          icon={bookIcon}
        />
        <QuadStat
          title="Avg. Pages Read"
          lastValue="4.20"
          value="4.90"
          percentValue={1.2}
          icon={bookIcon}
        />
      </div>
      <div className={cls.row}>
        <QuadStat
          title="Monthly Visitors"
          lastValue="200"
          value="320K"
          percentValue={-2.1}
          icon={bookIcon}
        />
        <QuadStat
          title="Monthly Visitors"
          lastValue="00:03:27"
          value="00:03:27"
          percentValue={-2.4}
          icon={bookIcon}
        />
      </div>
    </Card>
  );
};
export default QuadStats;
