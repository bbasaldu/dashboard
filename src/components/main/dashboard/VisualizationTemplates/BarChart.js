import { useEffect } from "react";
import { useSelector } from "react-redux";
import classes from "./BarChart.module.css";
import { buildBarChart, removeBarChart } from "./d3Scripts/buildBarChart";
const BarChart = (props) => {
  const resized = useSelector((state) => state.resizeState.resized);
  //on resize
  useEffect(() => {
    if (resized) {
      const theme = {
        first: "steelblue",
        second: "#C0C0C0",
        third: "#2cd9d0",
        fourth: "#F5F5F5",
      };
      const options = {
        theme,
      };
      removeBarChart(props.id);
      buildBarChart(props.id, props.data, options, false);
    }
  }, [resized, props]);

  useEffect(() => {
    const theme = {
      first: "steelblue",
      second: "#C0C0C0",
      third: "#2cd9d0",
      fourth: "#F5F5F5",
    };
    const options = {
      theme,
    };
    buildBarChart(props.id, props.data, options, true);
  }, [props]);
  return (
    <div className={classes.container} id={props.id}>
      {/* <ToolTip id={`${props.id}_tooltip`}>Hello</ToolTip> */}
    </div>
  );
};
export default BarChart;
