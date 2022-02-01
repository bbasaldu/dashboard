import * as d3 from "d3";
import { getLongestTick, getTextBBox } from "../../utility.js";
import classes from "./LineChart.module.css";
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

  const xScale = d3
    .scaleTime()
    .domain([new Date("2020-01-01T00:00:00"), new Date("2020-12-30T00:00:00")]); //Need ISO 8601 format

  const yMin = d3.min(data, (d) => d.y);
  const yMax = d3.max(data, (d) => d.y);
  const yScale = d3.scaleLinear().domain([yMin, yMax]);

  const longestYTick = getLongestTick(yScale.ticks());
  const xTickBox = getTextBBox(svg, months[0]);
  const yTickBox = getTextBBox(svg, longestYTick);

  const margin = {
    left: yTickBox.width - 5,
    right: xTickBox.width / 2,
    top: 10,
    bottom: xTickBox.height + 6,
  };

  xScale.range([margin.left, width - margin.right]).nice();
  yScale.range([height - margin.bottom, margin.top]).nice();

  const xAxis = svg
    .append("g")
    .attr("class", classes.xAxis)
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%b")));
  const xAxisLabels = xAxis.selectAll(".tick").selectAll("text");

  xAxisLabels.attr("id", (d, i) => {
    const id = d3.timeFormat("%b%y")(d);
    return id;
  });

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
  grid.selectAll("line").attr("stroke", theme.second);

  const line = d3
    .line()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y))
    .curve(d3.curveCatmullRom.alpha(0.5));
  const path = svg
    .append("path")
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("d", line(data));
  const transitionTime = 1000;
  const transitionEase = d3.easeQuadOut;
  if (transition) {
    const totalLength = path.node().getTotalLength();
    path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(transitionTime)
      .ease(transitionEase)
      .attr("stroke-dashoffset", 0);
  }
};
