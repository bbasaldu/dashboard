import { useEffect, useRef } from "react";
import useIsVisible from "../../hooks/useIsVisible";
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
  const isVisible = useIsVisible(containerRef);
  useEffect(() => {
    if (isVisible) {
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
    }
  }, [renderFunction, data, updateFunction, isVisible]);
  useEffect(() => {
    if (isVisible) {
      window.addEventListener("resize", () =>
        renderFunction({
          data,
          containerRef: containerRef.current,
          transition: false,
        })
      );
    }
  }, [renderFunction, data, isVisible]);
  return (
    <div
      className={[cls.chartContainer, className ? className : ""].join(" ")}
      ref={containerRef}
    ></div>
  );
};
export default Chart;
