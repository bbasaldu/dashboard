import classes from "./MultiLineChart.module.css";
import { Fragment, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  isScrolledIntoView,
  getElemBBox,
} from "../../../../../general/usefulFunctions";
import * as d3 from "d3";
import XAxis from "./XAxis";
import YAxis from "./YAxis";
import Paths from "./Paths";
//fixed variables
const theme = {
  first: "steelblue",
  second: "#C0C0C0",
  third: "#2cd9d0",
};
const options = {
  theme,
};
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

const transitionTime = 1000;
const transitionEase = d3.easeQuadOut;
const yTicks = 5;
const tickSize = 6;

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
        y: func(count)
      };
      array.push(date);
      count += 0.1;
    }
  }
  
  return array
};
const data = [
  {
    label: "line1",
    pointData: generateData((count) => Math.sin(count)*40 + 50)
  },
  {
    label: "line2",
    pointData: generateData((count) => Math.sin(count/20)*40 + 30)
  },
];
const MultiLineChart = (props) => {
  const resized = useSelector((state) => state.resizeState.resized);
  const containerRef = useRef();
  const [vars, setVars] = useState(null);
  const [animate, setAnimate] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [dataState, setDataState] = useState(data)
    const [count, setCount] = useState(false)
    const changeData = () => {
        const temp = Array.from(data)
        if(count === false){
            setDataState(temp.slice(0, 1))
            setCount(last => !last)
        }
        else {
            setDataState(temp.slice(0, 2))
            setCount(last => !last)
        }
        console.log('changed')
    }

  const calculateVariables = () => {
    const container = d3.select(containerRef.current);
    const svg = container.select("svg");
    const w = parseFloat(container.style("width"));
    const h = parseFloat(container.style("height"));
    const xTickDim = getElemBBox(svg, months[0] + "");
    const yMin = d3.min(data, (line) => d3.min(line.pointData, (d) => d.y));
    const yMax = d3.max(data, (line) => d3.max(line.pointData, (d) => d.y));
    const yTickArray = d3.ticks(0, yMax, 10);
    const yTickDim = getElemBBox(svg, yTickArray[yTickArray.length - 1] + "");
    const margin = {
      //ticksize is tick line length, tickvars is largest label varsension to fit label
      left: tickSize + yTickDim.width + w * 0.02,
      right: xTickDim.width / 2 + w * 0.02, //half of label width since label goes past end of axis line
      bottom: tickSize + xTickDim.height + h * 0.025, //default tick size is 6px, make room for labels under, plus extra 5%
      top: h * 0.05,
    };
    const width = w - margin.right;
    const height = h - margin.bottom;

    const xScale = d3
      .scaleTime()
      .domain([
        new Date("2020-01-01T00:00:00"),
        new Date("2020-12-30T00:00:00"),
      ]) //Need ISO 8601 format
      .range([margin.left, width])
      .nice();

    const yScale = d3
      .scaleLinear()
      .domain([yMin, yMax])
      .range([height, margin.top])
      .nice();

    setVars({ w, h, width, height, margin, xScale, yScale, tickSize, options });
  };

  //resize
  useEffect(() => {
    if (resized && isVisible) {
      calculateVariables();
    }
  }, [resized, isVisible]);

  //inital
  useEffect(() => {
    const onVisibleChange = () => {
      if (isScrolledIntoView(containerRef.current)) {
        window.removeEventListener("scroll", onVisibleChange);
        setIsVisible(true);
      }
    };
    window.addEventListener("scroll", onVisibleChange);
    onVisibleChange();
    if (isVisible) {
      calculateVariables();
    }
  }, [isVisible]);

  //animate
  useEffect(() => {
    //if svg has been rendered already
    if (vars !== null && animate) {
      //animate function using d3
    }
  }, [vars, animate]);

  return (
    <div className={classes.container} ref={containerRef}>
      <svg className={classes.svg} id={`${props.id}_svg`} onClick={changeData}>
        {vars !== null && (
          <Fragment>
            <XAxis className={classes.xAxis} id={props.id} vars={vars}/>
            <YAxis className={classes.yAxis} id={props.id} vars={vars} />
            <Paths vars={vars} data={dataState} id={props.id} />
          </Fragment>
        )}
      </svg>
    </div>
  );
};
export default MultiLineChart;
