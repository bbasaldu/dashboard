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
let line;
let xScale;
let yScale;
const transitionTime = 1000;
const transitionEase = d3.easeQuadOut;
export const renderChart = (vars) => {
  const { data, containerRef, transition } = vars;
  const container = d3.select(containerRef);
  const width = parseFloat(container.style("width"));
  const height = parseFloat(container.style("height"));
  container.selectAll("svg").remove();

  const svg = container
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  xScale = d3
    .scaleTime()
    .domain([new Date("2020-01-01T00:00:00"), new Date("2020-12-30T00:00:00")]); //Need ISO 8601 format
  const yMin = d3.min(data, (d) => d3.min(d.points, (d) => d.y));
  const yMax = d3.max(data, (d) => d3.max(d.points, (d) => d.y));
  yScale = d3.scaleLinear().domain([yMin, yMax]);

  const longestYTick = getLongestTick(yScale.ticks());
  const xTickBox = getTextBBox(svg, months[0]);
  const yTickBox = getTextBBox(svg, longestYTick);

  const margin = {
    left: yTickBox.width,
    right: xTickBox.width / 2,
    top: 10,
    bottom: xTickBox.height + 6,
  };

  xScale.range([margin.left, width - margin.right]).nice();
  yScale.range([height - margin.bottom, margin.top]).nice();

  svg
    .append("g")
    .attr("class", classes.xAxis)
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%b")));

  svg
    .append("g")
    .attr("class", classes.yAxis)
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(yScale).ticks(5));

  const grid = svg
    .append("g")
    .attr("class", classes.grid)
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(xScale).tickSize(-height).tickFormat(""));
  grid.selectAll("line").attr("stroke", "#C0C0C0");

  line = d3
    .line()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y))
    .curve(d3.curveCatmullRom.alpha(0.5));
  svg.append("g").attr("id", "multiLineGroup");

  updateData(vars);

  //   if (transition) {
  //     const totalLength = path.node().getTotalLength();
  //     path
  //       .attr("stroke-dasharray", totalLength + " " + totalLength)
  //       .attr("stroke-dashoffset", totalLength)
  //       .transition()
  //       .duration(transitionTime)
  //       .ease(transitionEase)
  //       .attr("stroke-dashoffset", 0);
  //   }
};

export const updateData = (vars) => {
  const { data, containerRef, transition } = vars;
  const container = d3.select(containerRef);
  const svg = container.select("svg");
  const pathGroup = svg.select("#multiLineGroup");
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
  const handleUpdate = (update) => {};
  const handleExit = (exit) => {
      exit.remove()
  }
  pathGroup
    .selectAll("path")
    .data(data, (d) => d.label)
    .join(
      (enter) => handleEnter(enter),
      (update) => handleUpdate(update),
      (exit) => handleExit(exit)
    );
};
