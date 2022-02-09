import * as d3 from "d3";
import { getTextBBox } from "../../utility.js";
import classes from "./BarChart.module.css";
const theme = {
  first: "steelblue",
  second: "#C0C0C0",
  third: "#2cd9d0",
  fourth: "#F5F5F5",
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
    .scaleBand()
    .domain(data.map((d) => d.label))
    .padding(0.05);

  const yMin = 0;
  const yMax = d3.max(data, (d) => d.value);
  const yScale = d3.scaleLinear().domain([yMin, yMax]);

  const xTickBox = getTextBBox(svg, "A");

  const margin = {
    left: 0,
    right: 0,
    top: 10,
    bottom: xTickBox.height + 6,
  };

  xScale.range([margin.left, width - margin.right]);
  yScale.range([height - margin.bottom, margin.top]).nice();

  svg
    .append("g")
    .attr("class", classes.xAxis)
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(xScale));

  svg
    .append("g")
    .attr("class", classes.yAxis)
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(yScale).ticks(5));

  svg
    .append("g")
    .selectAll(".emptyBars")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d) => xScale(d.label))
    .attr("y", margin.top)
    .attr("width", xScale.bandwidth())
    .attr("height", height - margin.bottom - margin.top)
    .attr("rx", 20)
    .attr("fill", theme.fourth);

  const bars = svg
    .append("g")
    .selectAll(".Bars")
    .data(data, (d) => d.label)
    .enter()
    .append("rect")
    .attr("x", (d) => xScale(d.label))
    .attr("width", xScale.bandwidth())
    .attr("rx", 20)
    .attr("fill", theme.third);

  if (transition) {
    bars
      .attr("y", height - margin.bottom)
      .attr("height", 0)
      .transition()
      .duration(1000)
      .attr("y", (d) => yScale(d.value))
      .attr("height", (d) => height - yScale(d.value) - margin.bottom);
  } else {
    bars
      .attr("y", (d) => yScale(d.value))
      .attr("height", (d) => height - yScale(d.value) - margin.bottom);
  }
};

export const updateData = (vars) => {
    const {data,} = vars
    console.log(data)
};
