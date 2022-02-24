import * as d3 from "d3";
import { getLongestTick, getTextBBox } from "../../utility.js";
import classes from "./MultiLineChart.module.css";
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
// Globals
let svg;
let line;
let xScale;
let yScale;
let margin;
let width;
let height;
let pathGroup;
const id = "multiline_1";
const transitionTime = 1000;
const transitionEase = d3.easeQuadOut;

const calculateGlobals = (vars) => {
  const { data, svg } = vars;
  xScale = d3
    .scaleTime()
    .domain([new Date("2020-01-01T00:00:00"), new Date("2020-12-30T00:00:00")]); //Need ISO 8601 format
  const yMin = d3.min(data, (d) => d3.min(d.points, (d) => d.y));
  const yMax = d3.max(data, (d) => d3.max(d.points, (d) => d.y));
  yScale = d3.scaleLinear().domain([yMin, yMax]);

  const longestYTick = getLongestTick(yScale.ticks());
  const xTickBox = getTextBBox(svg, months[0]);
  const yTickBox = getTextBBox(svg, longestYTick);

  margin = {
    left: 23.2, //yTickBox.width,
    right: xTickBox.width / 2,
    top: 10,
    bottom: xTickBox.height + 6,
  };

  xScale.range([margin.left, width - margin.right]).nice();
  yScale.range([height - margin.bottom, margin.top]).nice();

  line = d3
    .line()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y))
    .curve(d3.curveCatmullRom.alpha(0.5));
};
const calculateAxis = (isNew) => {
  if (isNew) {
    svg
      .append("g")
      .attr("id", `${id}_xAxis`)
      .attr("class", classes.xAxis)
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%b")));

    svg
      .append("g")
      .attr("id", `${id}_yAxis`)
      .attr("class", classes.yAxis)
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale).ticks(5));
    const grid = svg
      .append("g")
      .attr("id", `${id}_grid`)
      .attr("class", classes.grid)
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickSize(-height).tickFormat(""));
    grid.selectAll("line").attr("stroke", "#C0C0C0");

    pathGroup = svg.append("g").attr("id", "multiLineGroup");
  } else {
    d3.select(`#${id}_xAxis`)
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%b")));
    d3.select(`#${id}_yAxis`)
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale).ticks(5));
  }
};

export const renderChart = (vars) => {
  const { data, containerRef } = vars;
  const container = d3.select(containerRef);
  width = parseFloat(container.style("width"));
  height = parseFloat(container.style("height"));
  container.selectAll("svg").remove();

  svg = container.append("svg").attr("width", width).attr("height", height);

  calculateGlobals({ data, svg });

  calculateAxis(true);
  updateData(vars);
};
/*
Note: When interrupting exit selection with 'enter',
it actually triggers update.

So line goes back in exit but if interrupted, 
must be transitioned back in update and not enter
*/
export const updateData = (vars) => {
  const { data, transition } = vars;
  pathGroup = svg.select("#multiLineGroup");
  calculateGlobals({ data, svg });
  calculateAxis(false);
  const handleEnter = (enter) => {
    const paths = enter
      .append("path")
      .attr("fill", "none")
      .attr("stroke", (d) => d.color)
      .attr("stroke-width", 2)
      .attr("stroke-linecap", "round")
      .attr("d", (d) => line(d.points));
    if (transition) {
      paths.each(function () {
        const path = d3.select(this);
        const totalLength = path.node().getTotalLength();
        path
          .attr("stroke-dasharray", totalLength + " " + totalLength)
          .attr("stroke-dashoffset", totalLength)
          .transition()
          .duration(transitionTime)
          .ease(transitionEase)
          .attr("stroke-dashoffset", 0);
      });
    }
  };
  const handleUpdate = (update) => {
    update.each((d, i, n) => {
      const pathNode = n[i];
      const path = d3.select(pathNode);
      //needed so if scales change, updated paths might be longer than before
      //so we must update stroke-dasharray with new length
      const copyPath = path.clone(true);
      copyPath
        .attr("stroke-dasharray", "unset")
        .attr("stroke-dashoffset", "unset")
        .attr("d", (d) => line(d.points));
      const copyPathLen = copyPath.node().getTotalLength();
      copyPath.remove();
      path
        .transition()
        .duration(transitionTime)
        .ease(transitionEase)
        .attr("stroke-dasharray", copyPathLen + " " + copyPathLen)
        .attr("stroke-dashoffset", 0)
        .attr("d", (d) => line(d.points));
    });
  };
  const handleExit = (exit) => {
    exit.each((d, i, n) => {
      const pathNode = n[i];
      const path = d3.select(pathNode);
      const totalLength = pathNode.getTotalLength();
      path
        .transition()
        .duration(transitionTime)
        .ease(transitionEase)
        .attr("stroke-dashoffset", totalLength)
        .remove();
    });
  };
  pathGroup
    .selectAll("path")
    .data(data, (d) => d.label)
    .join(
      (enter) => handleEnter(enter),
      (update) => handleUpdate(update),
      (exit) => handleExit(exit)
    );
};
