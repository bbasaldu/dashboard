import cls from "./Dashboard.module.css";
import HelpIcon from "../../icons/HelpIcon";
import QuickCard from "./QuickCard";
import { useState } from "react";
const DashboardTop = (props) => {
    const quickRanges = ['30 days', '90 days', '6 months', '12 months']
    const [selected, setSelected] = useState(3)
    const handleClick = (index) => {
      setSelected(index)
    }
  return (
    <div className={cls.topWrapper}>
        <div className={cls.top}>
      <div className={cls.left}>
        <h1>Project Statistics</h1>
        <HelpIcon size={20} style={{marginLeft: '10px'}}/>
      </div>
      <div className={cls.right}>
          {quickRanges.map((d,i) => {
              const styles = {
                  padding: '10px',
                  color: i===selected?'#fff':'#000',
                  backgroundColor: i===selected?'#fe8360':'#fff'
              }
              return (
                  <QuickCard key={d} index={i} style={styles} onClick={handleClick}>
                    {d}
                  </QuickCard>
              )
          })}
      </div>
    </div>
    </div>
  );
};
export default DashboardTop;
