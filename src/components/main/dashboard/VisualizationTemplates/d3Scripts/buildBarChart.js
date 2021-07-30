import * as d3 from "d3";
import classes from "./buildBarChart.module.css";
const getBBox = (svg, text) => {
  const temp = svg.append("text").text(text);

  const dim = temp.node().getBoundingClientRect();
  temp.remove();
  return dim;
};
export const buildBarChart = (id, data, options = null, transition = true) => {
  const { theme } = options;
  //tooltip - for some reason css top, left dont affect it so i have to set it here
  //could increase performance(is it negligable?) by creating tooltip in react component and having it persist
  const tooltip = d3
  .select("body")
  .append("div")
  .attr("class", classes.tooltip)
  .attr("id", `${id}_tooltip`)
  .style("opacity", 0)
  .style('top', '0px')
  .style('left', '0px')

  const container = d3.select(`#${id}`);

  const w = parseFloat(container.style("width"));
  const h = parseFloat(container.style("height"));

  const svg = container
    .append("svg")
    .attr("class", classes.svg)
    .attr("id", `${id}_svg`)
    .attr("width", w)
    .attr("height", h);

  const yMax = d3.max(data, (d) => d.value);
  const xTickDim = getBBox(svg, data[0].label);
  const tickSize = 6;
  const transitionEase = d3.easeCubicOut;
  const transitionTime = 1000;
  const margin = {
    left: 0,
    right: 0,
    bottom: tickSize + xTickDim.height,
    top: 0,
  };
  const width = w - margin.right;
  const height = h - margin.bottom;

  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.label))
    .range([margin.left, width])
    .padding(0.05);
  const xAxis = svg
    .append("g")
    .attr("class", classes.xAxis)
    .attr("id", `${id}_xAxis`)
    .attr("transform", `translate(${0}, ${height})`)
    .call(d3.axisBottom(xScale));

  const yScale = d3.scaleLinear().domain([0, yMax]).range([height, margin.top]);
  const yAxis = svg
    .append("g")
    .attr("class", classes.yAxis)
    .attr("id", `${id}_yAxis`)
    .attr("transform", `translate(${margin.left}, ${0})`)
    .call(d3.axisLeft(yScale));

  //bottle style for bars
  const buildBottles = () => {
    svg
      .selectAll("bottoles")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.label))
      .attr("y", (d) => yScale(yMax))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(yMax))
      .attr("rx", 20)
      .attr("fill", theme.fourth);
  };
  
  //might need getCoords function from here in the future
  //https://javascript.info/coordinates
  const showToolTip = (mouse, d) => {
    const tooltipDim = tooltip.node().getBoundingClientRect();
    tooltip
      .html(d.value)
      .style("left", `${mouse[0] - tooltipDim.width / 2}px`)
      .style("top", `${mouse[1] - tooltipDim.height - 7}px`); //y - ttheight - arrow length(css)
  };

  const changeData = (newData) => {
    svg
      .selectAll("bars")
      .data(data)
      .join(
        (enter) => handleEnter(enter),
        (update) => {},
        (exit) => {}
      );

    return d3.selectAll(`.${id}_enter_rects`);
  };

  const handleEnter = (enter) => {
    if (transition) {
      enter
        .append("rect")
        .attr("class", `${id}_enter_rects`)
        .attr("x", (d) => xScale(d.label))
        .attr("width", xScale.bandwidth())
        .attr("y", (d) => height)
        .attr("rx", 20)
        .attr("fill", theme.third)
        .transition()
        .duration(transitionTime)
        .ease(transitionEase)
        .attr("height", (d) => height - yScale(d.value))
        .attr("y", (d) => yScale(d.value));
    } else {
      enter
        .append("rect")
        .attr("class", `${id}_enter_rects`)
        .attr("x", (d) => xScale(d.label))
        .attr("y", (d) => yScale(d.value))
        .attr("width", xScale.bandwidth())
        .attr("height", (d) => height - yScale(d.value))
        .attr("rx", 20)
        .attr("fill", theme.third);
    }
  };
  svg.selectAll("text").attr("color", theme.second);
  buildBottles();
  const rects = changeData(data);

  //for highlighting bar value with tooltip
  rects
    .on("mouseenter", () => {
      tooltip.style('opacity', 1)
    })
    .on("mousemove", (ev, d) => {
      const mouse = d3.pointer(ev, svg);
      showToolTip(mouse, d);
    })
    .on("mouseleave", () => {
        tooltip.style("opacity", 0);
    });

};
export const removeBarChart = (id) => {
  const container = d3.select(`#${id}`);
  //to make sure we dont redraw it
  d3.select(`#${id}_tooltip`).remove()
  container.selectAll("svg").remove();
};
