import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./PieChart.module.css";
import * as d3 from "d3";
import Table from "../../Table";
import Row from "../../Row";
import Headers from "../../Headers";
import LegendColor from "../../LegendColor";
import { isScrolledIntoView } from "../../../../../general/usefulFunctions";

const colors = ["#2cd9d0", "#5eacc9", "#e4970f", "#cc3035"];
const color = (color) => {
  return <LegendColor color={color} />;
};
const animatePieArcs = (arcsGroup, arcs, arcFunc, setAnimate) => {
  const g = d3.select(arcsGroup);
  const arcPaths = g.selectAll("path");

  arcPaths
    .attr("transform", "rotate(-180)")
    .transition()
    .ease(d3.easeElasticOut.amplitude(1).period(0.99))
    .duration(2000)
    .attr("transform", "rotate(0)")
    .attrTween("d", (d, i) =>
      tweenPie(i === 0 ? 0 : arcs[i - 1].endAngle, arcs[i], arcFunc)
    )
    .on('end', () => setAnimate(false))
  //overlapping first arc
  g.select("path").raise();
};
const pieChartHeaders = ["Legend", "Label", "Value"];
function tweenPie(end, b, arc) {
  let i = d3.interpolate({ startAngle: end, endAngle: end }, b);
  return function (t) {
    return arc(i(t));
  };
}
const PieChart = (props) => {
  const resized = useSelector((state) => state.resizeState.resized);
  const containerRef = useRef();
  const arcsGroupRef = useRef();
  const [dim, setDim] = useState(null);
  const [animate, setAnimate] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const { total, pieData } = props.data;
  const pie = d3.pie().value((d) => d.value);
  const arcs = pie(pieData);
  //to giveoverlap effect like in the product design
  arcs.forEach((arc) => {
    arc.startAngle *= 0.95;
    arc.endAngle *= 1.05;
  });

  const calculateVariables = () => {
    const container = d3.select(containerRef.current);
    const width = parseFloat(container.style("width"));
    const height = parseFloat(container.style("height"));
    const radius = Math.min(width, height) / 2;
    const mainArc = { inner: radius * 0.65, outer: radius * 1 };
    const arc = d3
      .arc()
      .innerRadius(mainArc.inner)
      .outerRadius(mainArc.outer)
      .cornerRadius(15);
    setDim({ w: width, h: height, r: radius, arc: arc });
  };

  //resize
  useEffect(() => {
    if (resized && isVisible) {
      calculateVariables();
    }
  }, [resized, isVisible]);

  //inital
  useEffect(() => {
    const onVisibleChange = () => {
      if (isScrolledIntoView(containerRef.current)) {
        window.removeEventListener("scroll", onVisibleChange);
        setIsVisible(true);
      }
    };
    window.addEventListener("scroll", onVisibleChange);
    onVisibleChange();
    if (isVisible) {
      calculateVariables();
    }
  }, [isVisible]);

  //animate
  useEffect(() => {
    //if svg has been rendered already
    if (dim !== null && animate) {
      animatePieArcs(arcsGroupRef.current, arcs, dim.arc, setAnimate);
    }
  }, [dim, arcs, animate]);

  return (
    <div className={classes.vertical}>
      <Table className={classes.pieLegend}>
        <Headers headers={pieChartHeaders} />
        <Row data={[color(colors[0]), "label1", 25]}></Row>
        <Row data={[color(colors[1]), "label2", 25]}></Row>
        <Row data={[color(colors[2]), "label3", 25]}></Row>
        <Row data={[color(colors[3]), "label4", 25]}></Row>
      </Table>

      <div className={classes.container} ref={containerRef}>
        {dim !== null && (
          <svg className={classes.svg} id={`${props.id}_svg`}>
            <g
              transform={`translate(${dim.w / 2},${dim.h / 2})`}
              ref={arcsGroupRef}
            >
              {animate &&
                arcs.map((d, i) => {
                  return (
                    <path key={`arc_${i}`} id={`arc_${i}`} fill={colors[i]} />
                  );
                })}
              {!animate &&
                arcs.map((d, i) => {
                  //for overlapping effect on first arc
                  const len = arcs.length - 1;
                  const index = i === len ? 0 : i + 1;
                  const curr = arcs[index];
                  return (
                    <path
                      key={`arc_${index}`}
                      id={`arc_${index}`}
                      fill={colors[index]}
                      d={dim.arc
                        .startAngle(curr.startAngle)
                        .endAngle(curr.endAngle)()}
                    />
                  );
                })}
              <text className={classes.textTop} fill={colors[0]}>
                {total}
              </text>
              <text className={classes.textBottom} dy="1.5em">
                Total
              </text>
            </g>
          </svg>
        )}
      </div>
    </div>
  );
};
export default PieChart;
