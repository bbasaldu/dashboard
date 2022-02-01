import * as d3 from "d3";
import classes from "./buildBarChart.module.css";
const getBBox = (svg, text) => {
  const temp = svg.append("text").text(text);

  const dim = temp.node().getBoundingClientRect();
  temp.remove();
  return dim;
};
//helper function to return new filtered data based on some filters
export const evalFilter = (filter, data, options) => {
  const num = options.findIndex((d) => d === filter);
  let newData = Array.from(data);
  if (num === 0) {
    //sort abc
    newData.sort((a, b) => a.label.localeCompare(b.label));
  } else if (num === 1) {
    //sort asc
    newData.sort((a, b) => a.value - b.value);
  } else if (num === 2) {
    //sort desc
    newData.sort((a, b) => b.value - a.value);
  }
  return newData;
};
export const buildBarChart = (
  id,
  data,
  options = null,
  transition = true,
  onDataChange
) => {
  //dont need a remove function if we just being with removal of everything on each call
  const { theme, selectionOptions } = options;
  const container = d3.select(`#${id}`);
  container.selectAll('svg').remove()
  d3.select(`#${id}_tooltip`).remove()
  //tooltip - for some reason css top, left dont affect it so i have to set it here
  //could increase performance(is it negligable?) by creating tooltip in react component and having it persist
  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", classes.tooltip)
    .attr("id", `${id}_tooltip`)
    .style("opacity", 0)
    .style("top", "0px")
    .style("left", "0px");


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
  svg
    .append("g")
    .attr("class", classes.yAxis)
    .attr("id", `${id}_yAxis`)
    .attr("transform", `translate(${margin.left}, ${0})`)
    .call(d3.axisLeft(yScale));

  //bottle style for bars
  const bottles = svg.append("g");
  const buildBottles = () => {
    bottles
      .selectAll("bottles")
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

  //handle data changes
  const rectGroup = svg.append("g").attr("id", `${id}_rects`);
  const changeData = (newData) => {
    xScale.domain(newData.map((d) => d.label));
    xAxis.transition().duration(1000).call(d3.axisBottom(xScale));
    rectGroup
      .selectAll("rect")
      .data(newData, (d) => d.label)
      .join(
        (enter) => handleEnter(enter),
        (update) => handleUpdate(update),
        (exit) => {}
      );
  };
  //handling data updates
  const handleEnter = (enter) => {
    if (transition) {
      enter
        .append("rect")
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
        .attr("x", (d) => xScale(d.label))
        .attr("y", (d) => yScale(d.value))
        .attr("width", xScale.bandwidth())
        .attr("height", (d) => height - yScale(d.value))
        .attr("rx", 20)
        .attr("fill", theme.third);
    }
  };

  const handleUpdate = (update) => {
    update
      .transition()
      .duration(1000)
      .attr("x", (d) => xScale(d.label));
  };

  svg.selectAll("text").attr("color", theme.second);
  buildBottles();
  //for highlighting bar value with tooltip
  //must be done after call to changeData, as rects wont render until then
  const registerRectEvents = () => {
    const rects = rectGroup.selectAll("rect");
    rects
    .on("mouseenter", () => {
      tooltip.style("opacity", 1);
    })
    .on("mousemove", (ev, d) => {
      const mouse = d3.pointer(ev, svg);
      showToolTip(mouse, d);
    })
    .on("mouseleave", () => {
      tooltip.style("opacity", 0);
    });
  }
  //wait for visible event to fire then remove listener as its only for inital animation
  //then do animation
  //if its being resized(transition = false),
  if (transition) {
    const initalLoad = () => {
      d3.select(`#${id}`).node().removeEventListener("isVisible", initalLoad);
      changeData(data);
      registerRectEvents()
      //.addEventListener('isVisible', null) //does this work?
    };
    d3.select(`#${id}`).node().addEventListener("isVisible", initalLoad);
  } else {
    changeData(data);
    registerRectEvents()
  }

  

  //listen for custom dropdown menu to change selection
  //change data
  d3.select(`#${id}_dropdown`).on("dataChange", (ev) => {
    const newData = evalFilter(ev.target.innerHTML, data, selectionOptions);
    changeData(newData);
    onDataChange(newData);
  });
};

export const removeBarChart = (id) => {
  const container = d3.select(`#${id}`);
  //to make sure we dont redraw it
  d3.select(`#${id}_tooltip`).remove();
  container.selectAll("svg").remove();
};
