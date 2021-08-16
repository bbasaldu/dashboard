import classes from "./MultiLineChart.module.css";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { isScrolledIntoView } from "../../../../../general/usefulFunctions";
import * as d3 from 'd3'
const Template = (props) => {
  const resized = useSelector((state) => state.resizeState.resized);
  const containerRef = useRef();
  const [dim, setDim] = useState(null);
  const [animate, setAnimate] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const calculateVariables = () => {
    const container = d3.select(containerRef.current);
    const width = parseFloat(container.style("width"));
    const height = parseFloat(container.style("height"));
    setDim({ w: width, h: height});
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
        //animate function using d3
    }
  }, [dim, animate]);

  return (
    <div className={classes.container} ref={containerRef}>
      {dim !== null && (
        <svg className={classes.svg} id={`${props.id}_svg`}>
          <circle
            cx={dim.w / 2}
            cy={dim.h / 2}
            r={Math.min(dim.w, dim.h) / 2}
          />
        </svg>
      )}
    </div>
  );
};
export default Template;