import * as d3 from "d3";
import classes from "./buildLineChart.module.css";

const getElemBBox = (svg, text) => {
  const temp = svg.append("text").text(text);

  const dim = temp.node().getBoundingClientRect();
  temp.remove();
  return dim;
};

export const buildLineChart = (id, data, options = null, transition = true) => {
  
  const { theme } = options;
  //tooltip
  const tooltip = d3
  .select("body")
  .append("div")
  .attr("class", classes.tooltip)
  .attr("id", `${id}_tooltip`)
  .style("opacity", 0)
  .style('top', '0px')
  .style('left', '0px')
  tooltip.append('div')
    .attr('id', `${id}_tooltip_top`)
    .attr('class', classes.tooltipTop)
  tooltip.append('div')
    .attr('id', `${id}_tooltip_bottom`)
    .attr('class', classes.tooltipBottom)
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

  const container = d3.select(`#${id}`);
  
  const w = parseFloat(container.style("width"));
  const h = parseFloat(container.style("height"));

  const svg = container
    .attr("class", classes.svg)
    .append("svg")
    .attr("id", `${id}_svg`)
    .attr("width", w)
    .attr("height", h);


  //some configurable options
  const transitionTime = 1000;
  const transitionEase = d3.easeQuadOut;
  const yTicks = 5;
  const tickSize = 6;
  const xTickDim = getElemBBox(svg, months[0] + "");
  const yMin = d3.min(data, (line) => d3.min(line.pointData, (d) => d.y));
  const yMax = d3.max(data, (line) => d3.max(line.pointData, (d) => d.y));
  const yTickArray = d3.ticks(0, yMax, 10);
  const yTickDim = getElemBBox(svg, yTickArray[yTickArray.length - 1] + "");
  const margin = {
    //ticksize is tick line length, tickdim is largest label dimension to fit label
    left: tickSize + yTickDim.width + w * 0.02,
    right: xTickDim.width / 2 + w * 0.02, //half of label width since label goes past end of axis line
    bottom: tickSize + xTickDim.height, //default tick size is 6px, make room for labels under
    top: h * 0.05,
  };
  const width = w - margin.right;
  const height = h - margin.bottom;
  //range from left margin(0+left margin) to right margin(width-right margin)
  const xScale = d3
    .scaleTime()
    .domain([new Date("2020-01-01T00:00:00"), new Date("2020-12-30T00:00:00")])//Need ISO 8601 format
    .range([margin.left, width])
    .nice();

  let xAxis = svg
    .append("g")
    .attr("class", classes.xAxis)
    .attr("id", `${id}_xAxis`)
    .attr("transform", `translate(${0}, ${height})`)
    .call(
      d3.axisBottom(xScale).tickSize(tickSize).tickFormat(d3.timeFormat("%b"))
    );
  const xAxisLabels = xAxis.selectAll(".tick").selectAll("text");

  xAxisLabels.attr("id", (d, i) => {
    const id = d3.timeFormat("%b%y")(d);
    return id;
  });
  const yScale = d3
    .scaleLinear()
    .domain([yMin, yMax])
    .range([height, margin.top])
    .nice();

  let yAxis = svg
    .append("g")
    .attr("class", classes.yAxis)
    .attr("id", `${id}_yAxis`)
    .attr("transform", `translate(${margin.left}, ${0})`)
    .call(d3.axisLeft(yScale).tickSize(tickSize).ticks(yTicks));
  yAxis.selectAll("line").attr("stroke", theme.first);

  const xGridLines = () => {
    return d3.axisBottom(xScale);
    //.ticks(5)
  };
  const grid = svg.append("g");
  grid
    .append("g")
    .attr("class", classes.grid)
    .attr("transform", "translate(0," + height + ")")
    .call(xGridLines().tickSize(-height).tickFormat(""));
  grid.selectAll("line").attr("stroke", theme.second);
  
  const line = d3.line()
    .x((d, i) => xScale(d.x))
    .y((d, i) => yScale(d.y))
    //https://github.com/d3/d3-shape#curves
    .curve(d3.curveCatmullRom.alpha(0.5));
    //.curve(d3.curveBasis);
  
  let path = svg
    .append("path")
    .attr("id", "path")
    .datum(data[0].pointData)
    .attr("fill", "none")
    .attr("stroke", theme.third)
    .attr("stroke-width", "2")
    .attr("stroke-linecap", "round")
    
    .attr("d", line);

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

  svg.selectAll("text").attr("color", theme.second);

  //for setting selective pointer marker//
  const points = [];
  data[0].pointData.forEach((e) => {
    let x, y
    x = xScale(e.x);
    y = yScale(yMin);//yScale(e.y);
    points.push([x, y]);
  });

  const radius = 4;
  const delanauy = d3.Delaunay.from(points);

  const setPointMarker = (index) => {
    const pointMarker = svg.select(`#${id}_pointMarker`);
    const x = points[index][0];
    const y = yScale(data[0].pointData[index].y)
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
  //used this function to help me out
  //https://javascript.info/coordinates
  const getCoords = (elem) => {
    const box = elem.getBoundingClientRect();
  
    return {
      top: box.top + window.pageYOffset,
      right: box.right + window.pageXOffset,
      bottom: box.bottom + window.pageYOffset,
      left: box.left + window.pageXOffset
    };
  }

  //for tool tip
  const setToolTip = (index) => {
    const x = points[index][0];
    const y = yScale(data[0].pointData[index].y)
    const tooltipDim = tooltip.node().getBoundingClientRect()
    const svgDim = getCoords(svg.node())
    //to translate div tooltip to svg coords
    //without pageoffset the tooltip height goes crazy
    const value = d3.format(',')(data[0].pointData[index].y.toFixed(3))
    tooltip
      .style('opacity', 1)
      .style(`left`, `${svgDim.left + x - tooltipDim.width/2}px`)
      .style('top', `${svgDim.top + y - tooltipDim.height - 7 - 14}px`)//...-arrow height(css) - extra offset
    d3.select(`#${id}_tooltip_top`).html(value)
    d3.select(`#${id}_tooltip_bottom`).html(d3.timeFormat("Numbers for %m/%d/%y")(data[0].pointData[index].x))
  };
  //for highlighting current month label
  let lastLabel = null;
  const highlightMonth = (index) => {
    const ease = d3.easeQuadIn;

    const dataPoint = data[0].pointData[index];
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

  //for highlighting y-axis line that intercepts current point
  const highlightYAxis = (index) => {
    const x = points[index][0];
    d3.select(`#${id}_YAxisHighlight`).remove();

    svg
      .append("line")
      .attr("id", `${id}_YAxisHighlight`)
      .attr("x1", x)
      .attr("x2", x)
      .attr("y1", height)
      .attr("y2", 0)
      .attr("stroke", theme.third)
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", 4);
  };
  svg.on("mousemove", (ev) => {
    const mouse = d3.pointer(ev);
    
    const index = delanauy.find(mouse[0], yScale(yMin));
    //only on index change - bug where on first run index is wrong
    setPointMarker(index);
    setToolTip(index);
    highlightMonth(index);
    highlightYAxis(index);
  });
  svg.on("mouseleave", () => {
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
    tooltip
      .style('opacity', 0)
    d3.select(`#${id}_YAxisHighlight`).remove();
  });

  //mobile event listeners

  //TODO: create a way to scroll down without activating touchmove
  //create timeout in touchstart
  //if timeout function executes it will change some variable which 
  //will be a boolean to run touchmove code, so prevent default only runs
  //when finger is held down for 200-500ms
  //in touchend clear timeout
  //have visual indicator for telling
  svg
  .on('touchstart', (ev) => {
    ev.preventDefault()
    const mouse = d3.pointers(ev)[0]//for some reason d3.pointer doesn't work for touchmove
    const index = delanauy.find(mouse[0], yScale(yMin));
    setPointMarker(index);
    setToolTip(index);
    highlightMonth(index);
    highlightYAxis(index);
    //have to render twice due to bug where pos on first render is totally off
    setPointMarker(index);
    setToolTip(index);
    highlightMonth(index);
    highlightYAxis(index);
    
    //navigator.vibrate(200) not on ios...
  })
  .on("touchmove", (ev) => {
    ev.preventDefault()
    const mouse = d3.pointers(ev)[0]//for some reason d3.pointer doesn't work for touchmove
    const index = delanauy.find(mouse[0], yScale(yMin));
    //only on index change - bug where on first run index is wrong
    setPointMarker(index);
    setToolTip(index);
    highlightMonth(index);
    highlightYAxis(index);

  })
  .on("touchend", () => {
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
    tooltip
      .style('opacity', 0)
    d3.select(`#${id}_YAxisHighlight`).remove();
  })


  const thisChart = {
    //properties
  };
  return thisChart;
};

export const removeLineChart = (id) => {
  const container = d3.select(`#${id}`);
  //remove tooltip since it will rerender
  d3.select(`#${id}_tooltip`).remove()
  container.selectAll('svg').remove()
  
};
