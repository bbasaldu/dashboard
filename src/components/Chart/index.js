import { useEffect, useRef, useState } from "react";
import cls from "./Chart.module.css";
const Chart = (props) => {
  const {
    renderFunction,
    data,
    className = null,
    updateFunction = () => {},
  } = props;
  const containerRef = useRef();
  const firstRenderRef = useRef(false);
  useEffect(() => {
    if (!firstRenderRef.current) {
      renderFunction({
        data,
        containerRef: containerRef.current,
        transition: true,
      });
      firstRenderRef.current = true;
    } else {
      updateFunction({
        data,
        containerRef: containerRef.current,
        transition: true,
      });
    }
  }, [renderFunction, data, updateFunction]);
  useEffect(() => {
    window.addEventListener("resize", () =>
      renderFunction({
        data,
        containerRef: containerRef.current,
        transition: false,
      })
    );
  }, [renderFunction, data]);
  return (
    <div
      className={[cls.chartContainer, className ? className : ""].join(" ")}
      ref={containerRef}
    ></div>
  );
};
export default Chart;
