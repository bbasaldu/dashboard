import { useEffect, useRef, useState} from "react";
import { useSelector } from "react-redux";
import DropDownMenu from "../../../general/DropDownMenu";
import classes from "./BarChart.module.css";
import { buildBarChart, evalFilter, removeBarChart} from "./d3Scripts/buildBarChart";
import * as d3 from 'd3'
import { isScrolledIntoView } from "../../../general/usefulFunctions";
const selectionOptions = ["sort alphabetically", "sort value ascending","sort value descending"]

const BarChart = (props) => {
  const ref = useRef()
  const resized = useSelector((state) => state.resizeState.resized);
  const initialData = props.data
  const [currentData, setCurrentData] = useState(props.data)
  //on resize
  useEffect(() => {
    if (resized) {
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
      buildBarChart(props.id, currentData, options, false);
    }
  }, [resized, props, currentData]);
  
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
    buildBarChart(props.id, props.data, options, true);
    // window.onscroll = () => {
    //   const isVisible = isScrolledIntoView(ref.current)
    //   console.log(isVisible)
    // }
    
    //wait for custom dropdown to change.
    //kinda messy, needed two of the same event, 
    //one in d3 script to change data
    //another in this file to change currentData for keeping 'data' state after resize
    d3.select(`#${props.id}_dropdown`).on('UpdateData', (ev) => {
      setCurrentData(evalFilter(ev.target.innerHTML, initialData, selectionOptions))
    })
  }, [props, initialData]);
  return (
    <div className={classes.container} id={props.id} ref={ref}>
      <DropDownMenu options={selectionOptions} id={props.id}/>
    </div>
  );
};
export default BarChart;
