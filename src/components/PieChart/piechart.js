import * as d3 from "d3";
import classes from "./PieChart.module.css";
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

  const r = Math.min(width, height) / 2;
  const g = svg
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  const pie = d3.pie().value((d) => d.value); //.sortValues((a,b) => b.value - a.value)

  const arcs = pie(data);
  const mainArc = { inner: r * 0.65, outer: r * 1 };
  const arc = d3
    .arc()
    .innerRadius(mainArc.inner)
    .outerRadius(mainArc.outer)
    .cornerRadius(15);

  //orignally only b param and start and end angle fixed to 0
  function tweenPie(end, b) {
    let i = d3.interpolate({ startAngle: end, endAngle: end }, b);
    return function (t) {
      return arc(i(t));
    };
  }
  
  const animatePieArcs = (arcs) => {
    arcs.forEach((arc, i) => {
      g.append("path")
        .attr("id", `arc_${i}`)
        .attr("fill", data[i].color)
        .attr("transform", "rotate(-180)")
        .transition()
        .ease(d3.easeElasticOut.amplitude(1).period(0.99))
        .duration(2000)
        .attr("transform", "rotate(0)")
        .attrTween("d", () =>
          tweenPie(i === 0 ? 0 : arcs[i - 1].endAngle, arcs[i])
        );
    });
    g.select("#arc_0").raise();
  };

  arcs.forEach((arc) => {
    arc.startAngle *= 0.95;
    arc.endAngle *= 1.05;
  });
  //resize bug for sure has to do with tweenpie giving different values than non transition
  if (transition) {
    animatePieArcs(arcs);
  } else {
    g.selectAll("path")
      .data(arcs)
      .enter()
      .append("path")
      .attr("transform", "rotate(0)")
      .attr("id", (d, i) => `arc_${i}`)
      .attr("fill", (d, i) => data[i].color)
      .attr("d", arc);
    g.select("#arc_0").raise();
  }
  //for centered text inside doughnut
  g.append("text")
    .attr("class", classes.pieTextTop)
    .attr("fill", data[0].color)
    .text(40);

  g.append("text")
    .attr("class", classes.pieTextBottom)
    .attr("dy", "1.5em")
    .text("Total");
};
