import PercentChange from "./PercentChange";
import classes from "./StatCard.module.css";
import helpIcon from "../../../../assets/fi-rr-interrogation.svg";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { isScrolledIntoView } from "../../../general/usefulFunctions";

function interpolateCustom(a,b, dp){
  return function interpolator(t) {
    const out = a * (1 - t) + b * t;
    return out.toFixed(dp)
  }
}
const animate = (last, current, ref) => {
  d3.select(ref)
    .transition().duration(2000).ease(d3.easePoly.exponent(3))
    .textTween(function() {
      return interpolateCustom(last, current, countDecimals(current))
    })

}
const countDecimals = function (value) {
  if(value.includes('.')){
    return value.split(".")[1].length
  }
  return 0
  
}

const StatCard = (props) => {
  const { percentValue,lastValue, value, positive, icon } = props;
  const iconRef = useRef()
  const helpIconRef = useRef()
  const valueRef = useRef()
  const containerRef = useRef()
  const [isVisible, setIsVisible] = useState(false)
  const lastChar = value[value.length-1]
  let num = value
  let suffix = ''
  if(isNaN(lastChar)){
    num = value.slice(0, value.length-1)
    suffix = lastChar
  }  
  useEffect(() => {
    d3.xml(icon).then((svg) => {
      const newNode = svg.documentElement.cloneNode(true);
      const node = iconRef.current.appendChild(newNode);
      d3.select(node)
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('fill', '#2cd9d0')
    });

    d3.xml(helpIcon).then((svg) => {
    const newNode = svg.documentElement.cloneNode(true);
      const node = helpIconRef.current.appendChild(newNode);
      d3.select(node)
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('fill', '#2cd9d0')

    })
  }, [icon]);
  //for animation effect
  useEffect(() => {
    
    const onVisibleChange = () => {
      if(isScrolledIntoView(containerRef.current)){
        window.removeEventListener('scroll', onVisibleChange)
        setIsVisible(true)
      }
    }
    window.addEventListener('scroll', onVisibleChange)
    onVisibleChange()
    if(isVisible){
      if(!num.includes(':')){
        animate(lastValue, num, valueRef.current)
      }
    }
  },[num, lastValue, isVisible])
  return (
    <div className={classes.container} ref={containerRef}>
      <div className={classes.top}>
        <div className={classes.svgIcon} ref={iconRef}></div>
        <PercentChange
          value={percentValue}
          positive={positive}
          className={classes.flexEnd}
        />
      </div>
      <div className={classes.middle}>
        <span ref={valueRef}>{lastValue || "00:03:27"}</span>
        <span>{suffix}</span>
      </div>
      <div className={classes.bottom}>
        <span>{props.children}</span>
        <div className={classes.helpIcon} ref={helpIconRef}></div>
      </div>
    </div>
  );
};
export default StatCard;
