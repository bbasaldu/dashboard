import { useEffect, useRef} from "react";
import classes from "./LineChart.module.css";
import { buildLineChart, removeLineChart } from "./d3Scripts/buildLineChart.js";
import { useSelector } from "react-redux";

//https://stackoverflow.com/a/22480938
//couldn't figure out a way to do this on my own
const isScrolledIntoView = (el) => {
  const rect = el.getBoundingClientRect();
  const elemTop = rect.top;
  const elemBottom = rect.bottom;
  // Partially visible elements return true:
  const isVisible = elemTop + 10 < window.innerHeight && elemBottom >= 0;
  return isVisible;
};

const LineChart = (props) => {
  const resized = useSelector((state) => state.resizeState.resized);

  const ref = useRef();

  //on resize
  useEffect(() => {
    if (resized) {
      const theme = {
        first: "steelblue",
        second: "#C0C0C0",
        third: "#2cd9d0",
      };
      const options = {
        theme,
      };
      removeLineChart(props.id);
      buildLineChart(props.id, props.data, options, false);
    }
  }, [resized, props]);

  useEffect(() => {
    const theme = {
      first: "steelblue",
      second: "#C0C0C0",
      third: "#2cd9d0",
    };
    const options = {
      theme,
    };

    buildLineChart(props.id, props.data, options, true);
  }, [props]);
  return (
    <div className={classes.container} id={props.id} ref={ref}>
      <div className={classes.tooltip} id={`${props.id}_tooltip`}>
        <div
          className={classes.tooltipArrow}
          id={`${props.id}_tooltip_arrow`}
        ></div>
        <div
          className={classes.tooltipInner}
          id={`${props.id}_tooltip_value`}
        ></div>
        <div
          className={classes.tooltipinner}
          id={`${props.id}_tooltip_desc`}
        ></div>
      </div>
    </div>
  );
};
export default LineChart;
