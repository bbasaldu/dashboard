import { useEffect, useRef } from "react";
import cls from "./QuadStats.module.css";
import * as d3 from "d3";
import useIsVisible from "../../hooks/useIsVisible";
function interpolateCustom(a, b, dp) {
  return function interpolator(t) {
    const out = a * (1 - t) + b * t;
    return out.toFixed(dp);
  };
}
const animate = (last, current, ref) => {
  d3.select(ref)
    .transition()
    .duration(2000)
    .ease(d3.easePoly.exponent(3))
    .textTween(function () {
      return interpolateCustom(last, current, countDecimals(current));
    });
};
const countDecimals = function (value) {
  if (value.includes(".")) {
    return value.split(".")[1].length;
  }
  return 0;
};
const QuadStat = (props) => {
  const { title, percentValue, lastValue, value, icon } = props;
  const containerRef = useRef();
  const valueRef = useRef();
  const lastChar = value[value.length - 1];
  const isVisible = useIsVisible(containerRef);
  let num = value;
  let suffix = "";
  if (isNaN(lastChar)) {
    num = value.slice(0, value.length - 1);
    suffix = lastChar;
  }
  useEffect(() => {
    if (isVisible) {
      if (!num.includes(":")) {
        animate(lastValue, num, valueRef.current);
      }
    }
  }, [isVisible, lastValue, num]);
  return (
    <div ref={containerRef} className={cls.quadCard}>
      <div className={cls.quadCardTop}>
        <span>{`${percentValue}%`}</span>
      </div>
      <div className={cls.quadCardMid}>
        <span ref={valueRef}>{lastValue || "00:03:27"}</span>
        <span>{suffix}</span>
      </div>
      <div className={cls.quadCardBottom}>
        <span>{title}</span>
      </div>
    </div>
  );
};
export default QuadStat;
