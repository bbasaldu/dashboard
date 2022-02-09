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
  const [firstRender, setFirstRender] = useState(false);
  useEffect(() => {
    if (!firstRender) {
      renderFunction({
        data,
        containerRef: containerRef.current,
        transition: true,
      });
      setFirstRender(true);
    } else {
      updateFunction({
        data,
        containerRef: containerRef.current,
        transition: true,
      });
    }
  }, [renderFunction, data, firstRender, updateFunction]);
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
