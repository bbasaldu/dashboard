import * as d3 from "d3";
import classes from "./buildMultiLineChart.module.css";
const pathColors = ["#98DDCA", "#D5ECC2", "#FFD3B4", "#FFAAA7", "#EDCCDC"];
const pathColorsDark = pathColors.map((d) => d3.interpolateRgb(d, "#777")(0.3));
const getCoords = (elem) => {
  const box = elem.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset,
    right: box.right + window.pageXOffset,
    bottom: box.bottom + window.pageYOffset,
    left: box.left + window.pageXOffset,
  };
};
export const buildMultiLineChart = (vars, data) => {
  const {
    id,
    theme,
    w,
    h,
    tickSize,
    xTickDim,
    yMin,
    yMax,
    yTickDim,
    yTicks,
    margin,
    width,
    height,
    xScale,
    yScale,
    line,
    animate,
  } = vars;
  //d3.select(`#${id}_tooltipGroup`).remove()
  const tooltipTop = d3.select(`#${id}_tooltipTop`)
  if(tooltipTop.empty()){
    d3.select('body')
    .append("div")
      .attr("class", classes.tooltipTop)
      .attr("id", `${id}_tooltipTop`)
      .style('opacity', 0)
      .style("top", "0px")
      .style("left", "0px")
      .html('00/00/00')
  }
  const svg = d3.select(`#${id}_svg`);
  svg.selectAll("*").remove();
  svg.attr("width", w).attr("height", h);
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

  let yAxis = svg
    .append("g")
    .attr("class", classes.yAxis)
    .attr("id", `${id}_yAxis`)
    .attr("transform", `translate(${margin.left}, ${0})`)
    .call(d3.axisLeft(yScale).tickSize(tickSize).ticks(yTicks));

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

  svg.append("g").attr("id", `${id}_pathGroup`);
  svg.append("line").attr("id", `${id}_YAxisHighlight`);
};

export const changeData = (vars, data) => {
  const { id, line, height, theme, xScale, yScale, yMin, yMax } = vars;
  
  const svg = d3.select(`#${id}_svg`);
  const svgDim = getCoords(svg.node());
  const radius = 4;
  const tooltipTop = d3.select(`#${id}_tooltipTop`);
  const tooltipDim = tooltipTop.node().getBoundingClientRect();
  const setToolTips = (index) => {
    const x = points[index][0];
    const date = d3.timeFormat("%m/%d/%y")(data[0].pointData[index].x)
    tooltipTop
      .style(`left`, `${svgDim.left + x - tooltipDim.width/2}px`)
      .style("top", `${svgDim.top - tooltipDim.height}px`)
      .html(date);
    //first find overlapping then calc what their pos will be
    const overlappedIndexes = [];
    data.forEach((d, i) => {
      const y = yScale(d.pointData[index].y);
      data.forEach((e, j) => {
        if (i !== j && !overlappedIndexes.some((d) => d === i) && d.showing && e.showing) {
          const y2 = yScale(e.pointData[index].y);
          if (y + 4 >= y2 - 4 && y <= y2) {
            overlappedIndexes.push(i);
            overlappedIndexes.push(j);
          }
        }
      });
    });
    data.forEach((d, i) => {
      const tooltip = d3.select(`#${id}_tooltip_${i}`);
      if(!d.showing){
        tooltip.style('opacity', 0)
        return; //asks as continue since forEach is weird
      }
      else{
        tooltip.style('opacity', 'unset')
      }
      const y = yScale(d.pointData[index].y);
      const value = d3.format(",")(d.pointData[index].y.toFixed(3));
      let offset = overlappedIndexes.findIndex((index) => index === i);
      if (offset === 0 || offset === -1) {
        offset = 6;
      } 
      else {
        offset = offset * 50 + 6;
      }
      const tooltipDim = tooltipTop.node().getBoundingClientRect();
      
      if(tooltipDim.right >= svgDim.right){
        const thisDim = tooltip.node().getBoundingClientRect()
        offset = -1 * offset - thisDim.width

      }
      tooltip
        .style(`left`, `${svgDim.left + x + offset}px`)
        .style("top", `${svgDim.top + y - tooltipDim.height / 2}px`)
        .style("color", pathColorsDark[i])
        .html(value);
    });
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
          .attr("transform", `translate(${x}, ${yScale(d.pointData[index].y)})`)
          .attr("opacity", d.showing ? 1 : 0);
        pointMarker
          .append("circle")
          .attr("fill", "none")
          .attr("stroke", pathColorsDark[i])
          .attr("stroke-width", 2)
          .attr("stroke-dasharray", "2 2")
          .attr("r", radius);
      });
    } else {
      data.forEach((d, i) => {
        const y = yScale(d.pointData[index].y);
        d3.select(`#${d.label}_pointMarker`)
          .attr("transform", `translate(${x}, ${y})`)
          .attr("opacity", d.showing ? 1 : 0);
      });
    }
  };
  //for setting selective pointer marker//
  const points = [];
  //same for all elems in data array
  data[0].pointData.forEach((e) => {
    let x, y;
    x = xScale(e.x);
    y = yScale(yMin); //yScale(e.y);
    points.push([x, y]);
  });
  const delanauy = d3.Delaunay.from(points);
  //for highlighting y-axis line that intercepts current point
  const highlightYAxis = (index) => {
    const x = points[index][0];
    const yAxisLineId = `${id}_YAxisHighlight`;
    const yAxisLine = d3.select(`#${yAxisLineId}`);
    if (yAxisLine.empty()) svg.append("line").attr("id", `${yAxisLineId}`);

    yAxisLine
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
    highlightYAxis(index);
    setPointMarkers(index);
    d3.select(`#${id}_tooltipTop`).style('opacity', 1)
    d3.selectAll(`.${classes.tooltip}`).style('opacity', 1)
    setToolTips(index);
  });

  svg.on("mouseleave", () => {
    const pointMarkerGroup = svg.select(`#${id}_pointMarkerGroup`);
    if (!pointMarkerGroup.empty()) {
      pointMarkerGroup.remove();
    }
    d3.select(`#${id}_YAxisHighlight`).remove();
    d3.select(`#${id}_tooltipTop`).style('opacity', 0)
    d3.selectAll(`.${classes.tooltip}`).style('opacity', 0)
  });
  svg
  .on('touchstart', (ev) => {
    ev.preventDefault()
    const mouse = d3.pointers(ev)[0]//for some reason d3.pointer doesn't work for touchmove
    const index = delanauy.find(mouse[0], yScale(yMin));
    setPointMarkers(index);
    setToolTips(index);
    highlightYAxis(index);
    //big bug where inital position of these elements is completely off on very first render
    //on second render it is fine
    setPointMarkers(index);
    setToolTips(index);
    highlightYAxis(index);
    
    //navigator.vibrate(200) not on ios...
  })
  .on("touchmove", (ev) => {
    ev.preventDefault()
    const mouse = d3.pointers(ev)[0]//for some reason d3.pointer doesn't work for touchmove
    const index = delanauy.find(mouse[0], yScale(yMin));
    //only on index change - bug where on first run index is wrong
    setPointMarkers(index);
    d3.select(`#${id}_tooltipTop`).style('opacity', 1)
    d3.selectAll(`.${classes.tooltip}`).style('opacity', 1)
    setToolTips(index);
    highlightYAxis(index);

  })
  .on("touchend", () => {
    const pointMarkerGroup = svg.select(`#${id}_pointMarkerGroup`);
    if (!pointMarkerGroup.empty()) {
      pointMarkerGroup.remove();
    }
    d3.select(`#${id}_YAxisHighlight`).remove();
    d3.select(`#${id}_tooltipTop`).style('opacity', 0)
    d3.selectAll(`.${classes.tooltip}`).style('opacity', 0)
  })

  //handling data changes
  const handleEnter = (enter) => {
    const path = enter
      .append("path")
      .attr("fill", "none")
      .attr("stroke", (d, i) => pathColors[i])
      .attr("stroke-width", "2")
      .attr("stroke-linecap", "round")
      .attr("d", (d) => line(d.pointData));
    path
      .attr("data-len", function () {
        return this.getTotalLength();
      })
      .attr("stroke-dasharray", function () {
        const len = d3.select(this).attr("data-len");
        return `${len} ${len}`;
      })
      .attr("stroke-dashoffset", function (d) {
        return d.showing ? 0 : d3.select(this).attr("data-len");
      });
    
    enter.each(function (d, i) {
      if(d3.select(`#${id}_tooltip_${i}`).empty()){
        d3.select('body')
        .append("div")
        .attr("class", classes.tooltip)
        .attr("id", `${id}_tooltip_${i}`)
        .style('opacity', 0)
        .style("top", "0px")
        .style("left", "0px");
      }
    });
    if (vars.animate) {
      path
        .attr("stroke-dasharray", function () {
          const len = d3.select(this).attr("data-len");
          return `${len} ${len}`;
        })
        .attr("stroke-dashoffset", function () {
          return d3.select(this).attr("data-len");
        })
        .transition()
        .duration(1000)
        .attr("stroke-dashoffset", 0);
    }
  };
  const handleUpdate = (update) => {
    update.each(function (d) {
      if (!d.showing) {
        d3.select(this)
          .transition()
          .duration(1000)
          .attr("stroke-dashoffset", function () {
            return d3.select(this).attr("data-len");
          });
      } else {
        d3.select(this)
          .transition()
          .duration(1000)
          .attr("stroke-dashoffset", 0);
      }
    });
  };
  const handleExit = (exit) => {
    exit
      .transition()
      .duration(1000)
      .attr("stroke-dashoffset", function () {
        return d3.select(this).attr("data-len");
      })
      .remove();
  };
  const paths = svg
    .select(`#${id}_pathGroup`)
    .selectAll("path")
    .data(data, (d) => d.label)
    .join(
      (enter) => handleEnter(enter),
      (update) => {
        handleUpdate(update);
      },
      (exit) => handleExit(exit) //dont need for now as im keeping the paths and just updating its offset
    );
};
