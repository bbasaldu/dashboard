import { useEffect, useRef, useState} from "react";
import { useSelector } from "react-redux";
import DropDownMenu from "../../../general/DropDownMenu";
import classes from "./BarChart.module.css";
import { buildBarChart, removeBarChart} from "./d3Scripts/buildBarChart";
import { isScrolledIntoView } from "../../../general/usefulFunctions";
const selectionOptions = ["sort alphabetically", "sort value ascending","sort value descending"]
const isVisibleEvent = new Event('isVisible')
const BarChart = (props) => {
  const ref = useRef()
  const resized = useSelector((state) => state.resizeState.resized);
  const initialData = props.data
  const [currentData, setCurrentData] = useState(props.data)
  const [isVisible, setIsVisible] = useState(false)
  const onDataChange = (newData) => {
    setCurrentData(newData)
  }
  //on resize
  useEffect(() => {
    if (resized && isVisible) {
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
      removeBarChart(props.id);
      buildBarChart(props.id, currentData, options, false, onDataChange);
    }
  }, [resized, props, currentData, isVisible]);
  
  useEffect(() => {
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
    buildBarChart(props.id, props.data, options, true, onDataChange);
    //premptively add ev listener to window scroll in case element is not visible
    //if it is then remove listener, otherwise keep running on scroll then remove
    const onVisibleChange = () => {
      if(isScrolledIntoView(ref.current)){
        ref.current.dispatchEvent(isVisibleEvent)
        window.removeEventListener('scroll', onVisibleChange)
        setIsVisible(true)
      }
    }
    window.addEventListener('scroll', onVisibleChange)
    onVisibleChange()
    
  }, [props, initialData]);
  return (
    <div className={classes.container} id={props.id} ref={ref}>
      <DropDownMenu options={selectionOptions} id={props.id}/>
    </div>
  );
};
export default BarChart;
