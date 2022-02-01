import { useEffect } from "react";
import { useSelector } from "react-redux";

import { buildPieChart, removePieChart } from "./d3Scripts/buildPieChart";
import classes from "./PieChart.module.css";

const PieChart = (props) => {
  const resized = useSelector((state) => state.resizeState.resized);
  
  //on resize
  useEffect(() => {
    if (resized) {
      removePieChart(props.id);
      buildPieChart(props.id, props.data, null, false);
    }
  }, [resized, props]);

  useEffect(() => {
    buildPieChart(props.id, props.data, null, true);
  }, [props]);
  return <div className={classes.container} id={props.id}></div>;
};
export default PieChart;
