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

  //to highlight later
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
    .attr("stroke", theme.third)
    .attr('stroke-width', 2)
    .attr('stroke-linecap', 'round')
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
  ////////////// Register Interactions //////////////////
  const points = data.map((d) => {
    const x = xScale(d.x);
    const y = yScale(yMin);
    return [x, y];
  });
  const radius = 4;
  const delanauy = d3.Delaunay.from(points);
  const id = "lineChart";
  const setPointMarker = (index) => {
    const pointMarker = svg.select(`#${id}_pointMarker`);
    const x = points[index][0];
    const y = yScale(data[index].y);
    if (pointMarker.empty()) {
      const pointGroup = svg
        .append("g")
        .attr("id", `${id}_pointMarker`)
        .attr("transform", `translate(${x}, ${y})`);
      pointGroup
        .append("circle")
        .attr("fill", "white")
        .attr("stroke", theme.second)
        .attr("stroke-width", 0.5)
        .attr("r", radius + 1);
      pointGroup.append("circle").attr("fill", theme.third).attr("r", radius);
    } else {
      pointMarker.attr("transform", `translate(${x}, ${y})`);
    }
  };
  //for highlighting y-axis line that intercepts current point
  const highlightYAxis = (index) => {
    const x = points[index][0];
    d3.select(`#${id}_YAxisHighlight`).remove();

    svg
      .append("line")
      .attr("id", `${id}_YAxisHighlight`)
      .attr("x1", x)
      .attr("x2", x)
      .attr("y1", height - margin.bottom)
      .attr("y2", 0)
      .attr("stroke", theme.third)
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", 4);
  };
  //for highlighting current month label
  let lastLabel = null;
  const highlightMonth = (index) => {
    const ease = d3.easeQuadIn;

    const dataPoint = data[index];
    const id = d3.timeFormat("%b%y")(dataPoint.x);
    const monthLabel = d3.select(`#${id}`);

    if (lastLabel === null) {
      monthLabel.transition().duration(500).style("fill", theme.third);
    } else if (lastLabel !== null) {
      if (lastLabel.attr("id") !== monthLabel.attr("id")) {
        monthLabel.transition().duration(500).style("fill", theme.third);
        lastLabel
          .transition()
          .duration(500)
          .ease(ease)
          .style("fill", theme.second);
      }
    }
    //this function runs multiple times on mouse over, so lastlabel ends up becoming current
    lastLabel = monthLabel;
  };
  //tool tip
  const setToolTip = (index) => {
    let tooltip = d3.select(`#${id}_tooltip`);
    if (tooltip.empty()) {
      tooltip = container
        .append("div")
        .attr("id", `${id}_tooltip`)
        .attr("class", classes.tooltip);
      tooltip
        .append("div")
        .attr("id", `${id}_tooltip_top`)
        .attr("class", classes.tooltipTop)
        .html("46");
      tooltip
        .append("div")
        .attr("id", `${id}_tooltip_bottom`)
        .attr("class", classes.tooltipBottom)
        .html("here");
    }
    const x = points[index][0];
    const y = yScale(data[index].y);
    const tooltipDim = tooltip.node().getBoundingClientRect();
    const value = d3.format(",")(Math.round(data[index].y));
    tooltip
      .style("opacity", 1)
      .style("left", `${x - tooltipDim.width / 2}px`)
      .style("top", `${y - tooltipDim.height - 7 - 14}px`);
    d3.select(`#${id}_tooltip_top`).html(value);
    d3.select(`#${id}_tooltip_bottom`).html(
      d3.timeFormat("Numbers for %m/%d/%y")(data[index].x)
    );
  };
  svg
    .on("mousemove", (ev) => {
      const mouse = d3.pointer(ev);

      const index = delanauy.find(mouse[0], yScale(yMin));
      setPointMarker(index);
      highlightYAxis(index);
      highlightMonth(index);
      setToolTip(index);
      //only on index change - bug where on first run index is wrong
    })
    .on("mouseleave", () => {
      const pointMarker = svg.select(`#${id}_pointMarker`);
      if (!pointMarker.empty()) {
        pointMarker.remove();
      }
      if (lastLabel !== null) {
        lastLabel
          .transition()
          .duration(500)
          .ease(d3.easeQuadIn)
          .style("fill", theme.second);
      }
      lastLabel = null;
      d3.select(`#${id}_YAxisHighlight`).remove();
      d3.select(`#${id}_tooltip`).remove();
    });
  //mobile interaction
  svg
    .on("touchmove", (ev) => {
      ev.preventDefault();
      const mouse = d3.pointers(ev)[0];
      const index = delanauy.find(mouse[0], yScale(yMin));
      setPointMarker(index);
      highlightYAxis(index);
      highlightMonth(index);
      setToolTip(index);
    })
    .on("touchend", (ev) => {
      const pointMarker = svg.select(`#${id}_pointMarker`);
      if (!pointMarker.empty()) {
        pointMarker.remove();
      }
      if (lastLabel !== null) {
        lastLabel
          .transition()
          .duration(500)
          .ease(d3.easeQuadIn)
          .style("fill", theme.second);
      }
      lastLabel = null;
      d3.select(`#${id}_YAxisHighlight`).remove();
      d3.select(`#${id}_tooltip`).remove();
    });
};
