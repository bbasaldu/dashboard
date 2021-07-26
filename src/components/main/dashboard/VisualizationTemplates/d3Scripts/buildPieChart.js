import * as d3 from "d3";
import classes from "./buildPieChart.module.css";
export const buildPieChart = (id, data, options = null, transition = true) => {
  const colors = ["#2cd9d0", "#5eacc9", "#e4970f", "#cc3035"];
  const { total, pieData } = data;
  const container = d3.select(`#${id}`);
  const w = parseFloat(container.style("width"));
  const h = parseFloat(container.style("height"));

  const svg = container
    .attr("class", classes.svg)
    .append("svg")
    .attr("id", `${id}_svg`)
    .attr("width", w)
    .attr("height", h);

  const r = Math.min(w, h) / 2;
  const g = svg.append("g").attr("transform", `translate(${w / 2}, ${h / 2})`);
  const pie = d3.pie().value((d) => d.value); //.sortValues((a,b) => b.value - a.value)

  const arcs = pie(pieData);
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
        .attr("fill", colors[i])
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



  //console.log(arcs)
  arcs.forEach((arc) => {
    arc.startAngle *= 0.95;
    arc.endAngle *= 1.05;
  });
  if(transition){
    animatePieArcs(arcs)
  }
  else {
    g.selectAll('path')
    .data(arcs)
    .enter()
    .append('path')
    .attr('id', (d,i) => `arc_${i}`)
    .attr('fill', (d,i) => colors[i])
    .attr('d', arc)
  }
  

  //for centered text inside doughnut
  g.append("text")
    .text(total)
    .attr("text-anchor", "middle")
    .attr("fill", colors[0])
    .attr("font-weight", "bold")
    .attr("font-size", "clamp(30px, 4vmax, 50px)");

  g.append("text")
    .text("Total")
    .attr("text-anchor", "middle")
    .attr("dy", "1.5em")
    .attr("fill", "#C0C0C0")
    .attr("font-weight", "bold")
    .style("font-size", "clamp(15px, 1vmax, 30px)");
};
export const removePieChart = (id) => {
  const container = d3.select(`#${id}`);
  container.selectAll("svg").remove();
};
