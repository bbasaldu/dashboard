import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./Chart.module.css";
import * as d3 from "d3";
const Chart = (props) => {
  const resized = useSelector((state) => state.resizeState.resized);
  const containerRef = useRef();
  const [svgDim, setSvgDim] = useState(null);
  const [renderSvg, setRenderSvg] = useState(false);

  const render = () => {
    const container = d3.select(containerRef.current);
    const w = parseFloat(container.style("width"));
    const h = parseFloat(container.style("height"));
    setSvgDim({width: w, height: h})
  }
  //resize
  useEffect(() => {
    if(resized){
        render()
    }
  },[resized])

  //inital
  useEffect(() => {
    render()
    setRenderSvg(true)
  }, []);

  return (
    <div className={classes.container} ref={containerRef}>
      {renderSvg && (
        <svg
          className={classes.svg}
          style={{ width: svgDim.width, height: svgDim.height }}
        >
            {props.children}
        </svg>
      )}
    </div>
  );
};
export default Chart;
