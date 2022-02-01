import { useEffect, useRef } from "react";
import cls from "./Chart.module.css";
const Chart = (props) => {
  const { renderFunction, data } = props;
  const containerRef = useRef();
  useEffect(() => {
    renderFunction({ data, containerRef: containerRef.current, transition: true });
  }, [renderFunction, data]);
  useEffect(() => {
    window.addEventListener("resize", () =>
      renderFunction({ data, containerRef: containerRef.current, transition: false })
    );
  }, [renderFunction, data]);
  return <div className={cls.chartContainer} ref={containerRef}></div>;
};
export default Chart;
