import PercentChange from "./PercentChange";
import classes from "./StatCard.module.css";
import helpIcon from "../../../../assets/fi-rr-interrogation.svg";
import * as d3 from "d3";
import { useEffect, useRef } from "react";
const StatCard = (props) => {
  const { percentValue, value, positive, icon } = props;
  const iconRef = useRef()
  const helpIconRef = useRef()
  useEffect(() => {
    d3.xml(icon).then((svg) => {
      const newNode = svg.documentElement.cloneNode(true);
      const node = iconRef.current.appendChild(newNode);
      d3.select(node)
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('fill', '#2cd9d0')
    });

    d3.xml(helpIcon).then((svg) => {
    const newNode = svg.documentElement.cloneNode(true);
      const node = helpIconRef.current.appendChild(newNode);
      d3.select(node)
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('fill', '#2cd9d0')

    })
  }, [icon]);
  return (
    <div className={classes.container}>
      <div className={classes.top}>
        <div className={classes.svgIcon} ref={iconRef}></div>
        <PercentChange
          value={percentValue}
          positive={positive}
          className={classes.flexEnd}
        />
      </div>
      <div className={classes.middle}>
        <span>{value}</span>
      </div>
      <div className={classes.bottom}>
        <span>{props.children}</span>
        <div className={classes.helpIcon} ref={helpIconRef}></div>
      </div>
    </div>
  );
};
export default StatCard;
