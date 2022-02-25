import * as d3 from "d3";
import { getCoords, getLongestTick, getTextBBox } from "../../utility.js";
import classes from "./MultiLineChart.module.css";
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
let yMin;
let margin;
let width;
let height;
let pathGroup;
const yAxisLine = generateData((count) => count);
const id = "multiline_1";
const transitionTime = 1000;
const transitionEase = d3.easeQuadOut;

const calculateGlobals = (vars) => {
  const { data, svg } = vars;
  xScale = d3
    .scaleTime()
    .domain([new Date("2020-01-01T00:00:00"), new Date("2020-12-30T00:00:00")]); //Need ISO 8601 format
  yMin = d3.min(data, (d) => d3.min(d.points, (d) => d.y));
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
      .transition()
      .duration(transitionTime)
      .ease(transitionEase)
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%b")));
    d3.select(`#${id}_yAxis`)
      .transition()
      .duration(transitionTime)
      .ease(transitionEase)
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale).ticks(5));
    d3.select(`#${id}_grid`)
      .transition()
      .duration(transitionTime)
      .ease(transitionEase)
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickSize(-height).tickFormat(""));
  }
};
const registerEvents = (vars) => {
  const { data } = vars;
  const radius = 4;
  //for setting selective pointer marker//
  const points = [];
  //same for all elems in data array
  yAxisLine.forEach((e) => {
    let x, y;
    x = xScale(e.x);
    y = yScale(yMin); //yScale(e.y);
    points.push([x, y]);
  });
  const delanauy = d3.Delaunay.from(points);

  const highlightYAxis = (index) => {
    const x = points[index][0];
    const yAxisLineId = `${id}_YAxisHighlight`;
    const yAxisLine = d3.select(`#${yAxisLineId}`);
    if (yAxisLine.empty()) svg.append("line").attr("id", `${yAxisLineId}`);

    yAxisLine
      .attr("x1", x)
      .attr("x2", x)
      .attr("y1", height - margin.bottom)
      .attr("y2", 0)
      .attr("stroke", "#2cd9d0")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", 4);
  };
  const setPointMarkers = (index) => {
    const pointMarkerGroupId = `${id}_pointMarkerGroup`;
    let pointMarkerGroup = svg.select(`#${pointMarkerGroupId}`);
    const x = points[index][0];
    if (pointMarkerGroup.empty()) {
      pointMarkerGroup = svg
        .append("g")
        .attr("id", pointMarkerGroupId)
        .attr("class", classes.pointMarkers);
      data.forEach((d, i) => {
        const pointMarker = pointMarkerGroup
          .append("g")
          .attr("id", `${d.label}_pointMarker`)
          .attr("transform", `translate(${x}, ${yScale(d.points[index].y)})`);
        pointMarker
          .append("circle")
          .attr("fill", "none")
          .attr("stroke", d3.interpolateRgb(d.color, "#777")(0.3))
          .attr("stroke-width", 2)
          .attr("stroke-dasharray", "2 2")
          .attr("r", radius);
      });
    } else {
      data.forEach((d, i) => {
        const y = yScale(d.points[index].y);
        d3.select(`#${d.label}_pointMarker`).attr(
          "transform",
          `translate(${x}, ${y})`
        );
      });
    }
  };
  const setToolTips = (index) => {
    const tooltipTop = d3.select(`#${id}_tooltipTop`);
    const tooltipDim = tooltipTop.node().getBoundingClientRect();
    const svgDim = getCoords(svg.node());
    const x = points[index][0];
    const date = d3.timeFormat("%m/%d/%y")(data[0].points[index].x);
    tooltipTop
      .style(`left`, `${svgDim.left + x - tooltipDim.width / 2}px`)
      .style("top", `${svgDim.top - tooltipDim.height}px`)
      .html(date);
    //first find overlapping then calc what their pos will be
    const overlappedIndexes = [];
    data.forEach((d, i) => {
      const y = yScale(d.points[index].y);
      data.forEach((e, j) => {
        if (i !== j && !overlappedIndexes.some((d) => d === i)) {
          const y2 = yScale(e.points[index].y);
          if (y + 4 >= y2 - 4 && y <= y2) {
            overlappedIndexes.push(i);
            overlappedIndexes.push(j);
          }
        }
      });
    });
    data.forEach((d, i) => {
      const tooltip = d3.select(`#${id}_tooltip_${d.label}`);

      const y = yScale(d.points[index].y);
      const value = d3.format(",")(d.points[index].y.toFixed(3));
      let offset = overlappedIndexes.findIndex((index) => index === i);
      if (offset === 0 || offset === -1) {
        offset = 6;
      } else {
        offset = offset * 50 + 6;
      }

      try{
        if (tooltipDim.right >= svgDim.right) {
          const thisDim = tooltip.node().getBoundingClientRect();
          offset = -1 * offset - thisDim.width;
        }
      }
      catch {
        //not sure why the above might break
        //gotta debug this later, for now just skip past it
        //shouldn't break anything
      }
      tooltip
        .style(`left`, `${svgDim.left + x + offset}px`)
        .style("top", `${svgDim.top + y - tooltipDim.height / 2}px`)
        .style("color", d3.interpolateRgb(d.color, "#777")(0.3))
        .html(value);
    });
  };
  svg
    .on("mousemove", (ev) => {
      const mouse = d3.pointer(ev);
      const index = delanauy.find(mouse[0], yScale(yMin));
      d3.select(`#${id}_tooltipTop`).style("display", "unset");
      d3.selectAll(`.${classes.tooltip}`).style("display", "initial");
      highlightYAxis(index);
      setPointMarkers(index);
      setToolTips(index);
    })
    .on("mouseleave", () => {
      const pointMarkerGroup = svg.select(`#${id}_pointMarkerGroup`);
      if (!pointMarkerGroup.empty()) {
        pointMarkerGroup.remove();
      }
      d3.select(`#${id}_YAxisHighlight`).remove();
      d3.select(`#${id}_tooltipTop`).style("display", "none");
      d3.selectAll(`.${classes.tooltip}`).style("display", "none");
    });

  svg
    .on("touchstart", (ev) => {
      ev.preventDefault();
      const mouse = d3.pointers(ev)[0]; //for some reason d3.pointer doesn't work for touchmove
      const index = delanauy.find(mouse[0], yScale(yMin));
      d3.select(`#${id}_tooltipTop`).style("display", "unset");
      d3.selectAll(`.${classes.tooltip}`).style("display", "initial");
      highlightYAxis(index);
      setPointMarkers(index);
      setToolTips(index);
    })
    .on("touchmove", (ev) => {
      ev.preventDefault();
      const mouse = d3.pointers(ev)[0]; //for some reason d3.pointer doesn't work for touchmove
      const index = delanauy.find(mouse[0], yScale(yMin));
      d3.select(`#${id}_tooltipTop`).style("display", "unset");
      d3.selectAll(`.${classes.tooltip}`).style("display", "initial");
      highlightYAxis(index);
      setPointMarkers(index);
      setToolTips(index);
    })
    .on("touchend", (ev) => {
      const pointMarkerGroup = svg.select(`#${id}_pointMarkerGroup`);
      if (!pointMarkerGroup.empty()) {
        pointMarkerGroup.remove();
      }
      d3.select(`#${id}_YAxisHighlight`).remove();
      d3.select(`#${id}_tooltipTop`).style("display", "none");
      d3.selectAll(`.${classes.tooltip}`).style("display", "none");
    });
};
export const renderChart = (vars) => {
  const { data, containerRef } = vars;
  const container = d3.select(containerRef);
  width = parseFloat(container.style("width"));
  height = parseFloat(container.style("height"));
  container.selectAll("svg").remove();

  svg = container.append("svg").attr("width", width).attr("height", height);
  const tooltipTop = d3.select(`#${id}_tooltipTop`);
  if (tooltipTop.empty()) {
    d3.select("body")
      .append("div")
      .attr("class", classes.tooltipTop)
      .attr("id", `${id}_tooltipTop`)
      .style("display", "none")
      .style("top", "0px")
      .style("left", "0px")
      .html("00/00/00");
  }
  calculateGlobals({ data, svg });

  calculateAxis(true);
  updateData(vars);
  registerEvents(vars);
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
  registerEvents(vars);
  const handleEnter = (enter) => {
    const paths = enter
      .append("path")
      .attr("fill", "none")
      .attr("stroke", (d) => d.color)
      .attr("stroke-width", 2)
      .attr("stroke-linecap", "round")
      .attr("d", (d) => line(d.points));
    paths.each(function () {
      const path = d3.select(this);
      const totalLength = path.node().getTotalLength();
      path
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", 0);
      if (transition) {
        path
          .attr("stroke-dashoffset", totalLength)
          .transition()
          .duration(transitionTime)
          .ease(transitionEase)
          .attr("stroke-dashoffset", 0);
      }
    });

    //tooltips might move
    enter.each(function (d, i) {
      if (d3.select(`#${id}_tooltip_${d.label}`).empty()) {
        d3.select("body")
          .append("div")
          .attr("class", classes.tooltip)
          .attr("id", `${id}_tooltip_${d.label}`)
          .style("visible", "none")
          .style("top", "0px")
          .style("left", "0px");
      }
    });
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
      const tooltip = d3.select(`#${id}_tooltip_${d.label}`);
      tooltip.remove();
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
