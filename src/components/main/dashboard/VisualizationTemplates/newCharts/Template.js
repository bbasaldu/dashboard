import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./Chart.module.css";
import * as d3 from "d3";
const Template = (props) => {
  const resized = useSelector((state) => state.resizeState.resized);
  const containerRef = useRef();
  const [svgDim, setSvgDim] = useState(null);

  // const render = () => {
  //   const container = d3.select(containerRef.current);
  //   //  sconsole.log(container)
  //   const w = parseFloat(container.style("width"));
  //   const h = parseFloat(container.style("height"));
  //   setSvgDim({width: w, height: h})
  //   console.log('here')
  // }

  // const render = useCallback(() => {
  //   const container = d3.select(containerRef.current);
  //   //  sconsole.log(container)
  //   const w = parseFloat(container.style("width"));
  //   const h = parseFloat(container.style("height"));
  //   setSvgDim({width: w, height: h})
  //   console.log('here')
  // },[])

  //resize
  useEffect(() => {
    if(resized){
      //console.log('hello2')
      const container = d3.select(containerRef.current);
      const w = parseFloat(container.style("width"));
      const h = parseFloat(container.style("height"));
      setSvgDim({width: w, height: h})
    }
  },[resized])

  //inital
  useEffect(() => {
    console.log('hello')
    const container = d3.select(containerRef.current);
    const w = parseFloat(container.style("width"));
    const h = parseFloat(container.style("height"));
    setSvgDim({width: w, height: h})
  }, []);

  return (
    <div className={classes.container} ref={containerRef}>
      {svgDim !== null && (
        <svg
          className={classes.svg}
          id={'svgPrac'}
        >
            <circle cx={svgDim.width/2} cy={svgDim.height/2} r={Math.min(svgDim.width, svgDim.height)/2}/>
        </svg>
      )}
    </div>
  );
};
export default Template;