import { useCallback, useEffect, useRef, useState } from "react";
import classes from "./MultiLineChart.module.css";
import * as d3 from "d3";
import {
  getElemBBox,
  isScrolledIntoView,
} from "../../../general/usefulFunctions";
import {
  buildMultiLineChart,
  changeData,
  rangeChange,
} from "./d3Scripts/buildMultiLineChart";
import { useSelector } from "react-redux";
import { Fragment } from "react";
import LineDropDownMenu from "../../../general/LineDropDownMenu";
import DateFilter from "../../../general/DateFilter";
const generateData = (func) => {
  const array = [];
  let count = 1;
  for (let i = 1; i <= 12; i++) {
    for (let j = 1; j <= 30; j++) {
      if (i === 2 && j === 30) continue; //feb with day 30 yields an invalid date object
      const month = i < 10 ? `0${i}` : i;
      const day = j < 10 ? `0${j}` : j;
      const date = {
        x: new Date(`2020-${month}-${day}T00:00:00`),
        y: func(count),
      };
      array.push(date);
      count += 0.1;
    }
  }

  return array;
};
const lineData = [
  {
    label: "line1",
    pointData: generateData((count) => Math.sin(count) * 40 + 50),
    showing: true,
  },
  {
    label: "line2",
    pointData: generateData((count) => Math.sin(count / 20) * 40 + 30),
    showing: true,
  },
  {
    label: "line3",
    pointData: generateData((count) => Math.cos(count / 10) * 30),
    showing: true,
  },
  {
    label: "line4",
    pointData: generateData((count) => Math.cos(count / 20) * 30),
    showing: true,
  },
];
const transitionTime = 1000;
const transitionEase = d3.easeQuadOut;
const yTicks = 5;
const tickSize = 6;
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Dec",
];
const theme = {
  first: "steelblue",
  second: "#C0C0C0",
  third: "#2cd9d0",
};
const MultiLineChart = (props) => {
  const containerRef = useRef();
  const [data, setData] = useState(lineData);
  const [isVisible, setIsVisible] = useState(false);
  // const [range, setRange] = useState([
  //   new Date("2020-01-01T00:00:00"),
  //   new Date("2020-12-30T00:00:00"),
  // ]);

  const resized = useSelector((state) => state.resizeState.resized);
  const calculateVariables = useCallback(
    (
      animate,
      range = [new Date("2020-01-01T00:00:00"), new Date("2020-12-30T00:00:00")]
    ) => {
      const container = d3.select(containerRef.current);
      const svg = container.select("svg");
      let w = parseFloat(container.style("width"));
      let h = parseFloat(container.style("height"));

      const xTickDim = getElemBBox(svg, months[0] + "");
      const yMin = d3.min(data, (line) => d3.min(line.pointData, (d) => d.y));
      const yMax = d3.max(data, (line) => d3.max(line.pointData, (d) => d.y));
      const yTickArray = d3.ticks(0, yMax, 10);
      const yTickDim = getElemBBox(svg, yTickArray[yTickArray.length - 1] + "");
      const margin = {
        left: tickSize + yTickDim.width + w * 0.02,
        right: xTickDim.width / 2 + w * 0.02,
        bottom: tickSize + xTickDim.height,
        top: h * 0.05,
      };
      const width = w - margin.right;
      const height = h - margin.bottom;
      const xScale = d3
        .scaleTime()
        .domain(range) //Need ISO 8601 format
        .range([margin.left, width])
        //.nice();
      const yScale = d3
        .scaleLinear()
        .domain([yMin, yMax])
        .range([height, margin.top])
        .nice();
      const line = d3
        .line()
        .x((d, i) => xScale(d.x))
        .y((d, i) => yScale(d.y))
        .curve(d3.curveCatmullRom.alpha(0.5));
      const localVars = {
        id: props.id,
        theme,
        w,
        h,
        tickSize,
        xTickDim,
        yMin,
        yMax,
        yTickDim,
        yTicks,
        margin,
        width,
        height,
        xScale,
        yScale,
        line,
        animate,
        range
      };
      return localVars;
    },
    [props.id, data]
  );

  //on resize
  useEffect(() => {
    if (resized && !isVisible) {
      const vars = calculateVariables(false);
      buildMultiLineChart(vars, data);
    } else if (resized && isVisible) {
      const vars = calculateVariables(false);
      buildMultiLineChart(vars, data);
      changeData(vars, data);
    }
  }, [resized, calculateVariables, data, isVisible]);

  //initial
  useEffect(() => {
    if (!isVisible) {
      const vars = calculateVariables(true);
      buildMultiLineChart(vars, lineData);
      const onVisibleChange = () => {
        if (isScrolledIntoView(containerRef.current)) {
          window.removeEventListener("scroll", onVisibleChange);
          setIsVisible(true);
        }
      };
      window.addEventListener("scroll", onVisibleChange);
      onVisibleChange();
    }
  }, [calculateVariables, isVisible]);

  //on data change
  useEffect(() => {
    if (isVisible) {
      const vars = calculateVariables(true);
      changeData(vars, data);
    }
  }, [data, calculateVariables, isVisible]);

  const handleDataChange = (newData) => {
    //setRange([new Date("2020-08-01T00:00:00"),new Date("2020-12-30T00:00:00")])
    setData(newData);
  };
  const handleRangeChange = (range) => {
    //const newRange = [new Date("2020-11-01T00:00:00"),new Date("2020-12-30T00:00:00")]
    const vars = calculateVariables(true, range)
    rangeChange(vars, data)
  }
  return (
    <Fragment>
      <div className={classes.filters}>
        <LineDropDownMenu
          id={props.id}
          data={lineData}
          handleDataChange={handleDataChange}
        />
        <DateFilter data={lineData} onRangeChange={handleRangeChange} />
      </div>

      <div className={classes.container} ref={containerRef}>
        <svg id={`${props.id}_svg`}></svg>
      </div>
    </Fragment>
  );
};
export default MultiLineChart;
