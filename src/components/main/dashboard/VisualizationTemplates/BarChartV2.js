import { useEffect, useRef, useState} from "react";
import { useSelector } from "react-redux";
import DropDownMenu from "../../../general/DropDownMenu";
import classes from "./BarChart.module.css";
import { buildBarChart} from "./d3Scripts/buildBarChart";
import { isScrolledIntoView } from "../../../general/usefulFunctions";
const selectionOptions = ["sort alphabetically", "sort value ascending","sort value descending"]
const theme = {
    first: "steelblue",
    second: "#C0C0C0",
    third: "#2cd9d0",
    fourth: "#F5F5F5",
  };
  const options = {
    theme,
    selectionOptions
  };
const isVisibleEvent = new Event('isVisible')
const BarChartV2 = (props) => {
  const containerRef = useRef()
  const resized = useSelector((state) => state.resizeState.resized);
  const [currentData, setCurrentData] = useState(props.data)
  const [isVisible, setIsVisible] = useState(false)
  const onDataChange = (newData) => {
    setCurrentData(newData)
  }
  //on resize
  useEffect(() => {
    if (resized && isVisible) {
      
      buildBarChart(props.id, currentData, options, false, onDataChange);
    }
  }, [resized, props, currentData, isVisible]);
  
  useEffect(() => {
    buildBarChart(props.id, props.data, options, true, onDataChange);
    const onVisibleChange = () => {
        if(isScrolledIntoView(containerRef.current)){
          containerRef.current.dispatchEvent(isVisibleEvent)
          window.removeEventListener('scroll', onVisibleChange)
          setIsVisible(true)
        }
      }
      window.addEventListener('scroll', onVisibleChange)
      onVisibleChange()
  }, [props]);
  return (
    <div className={classes.container} id={props.id} ref={containerRef}>
      <DropDownMenu options={selectionOptions} id={props.id}/>
    </div>
  );
};
export default BarChartV2;