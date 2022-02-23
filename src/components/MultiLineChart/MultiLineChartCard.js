import Card from "../Card"
import TitleCard from "../TitleCard"
import MultiLineChart from "."
import DropDown from "./DropDown"
import cls from './MultiLineChart.module.css'
import { useState } from "react"
const generateData = (func) => {
   const array = [];
   let count = 1;
   for (let i = 1; i <= 12; i++) {
     for (let j = 1; j <= 30; j++) {
       if (i === 2 && j === 30) continue; //feb with day 30 yields an invalid date object
       const month = i < 10 ? `0${i}` : i;
       const day = j < 10 ? `0${j}` : j;
       const date = {
         x: new Date(`2020-${month}-${day}T00:00:00`),
         y: func(count),
       };
       array.push(date);
       count += 0.1;
     }
   }
 
   return array;
 };
 const test_data = [
   {
     label: "line1",
     points: generateData((count) => Math.sin(count) * 40 + 50),
     color: "rgb(152, 221, 202)"
   },
   {
     label: "line2",
     points: generateData((count) => Math.sin(count / 20) * 40 + 30),
     color: "rgb(213, 236, 194)"
   },
   {
     label: "line3",
     points: generateData((count) => Math.cos(count / 10) * 30),
     color: "rgb(255, 211, 180)"
   },
   {
     label: "line4",
     points: generateData((count) => Math.cos(count / 20) * 30),
     color: "rgb(255, 170, 167)"
   },
 ];
const MultiLineChartCard = () => {
   const [data, setData] = useState(test_data)
   const handleDataChange = (filter) => {
      setData(test_data.filter(d => d.label !== filter))
   }
   return (
    <Card>
    <TitleCard title="Year Total" value={24}/>
    <DropDown onChange={handleDataChange} options={test_data.map(d => d.label)}/>
    <MultiLineChart className={cls.withDropDown} data={data}/>
  </Card>
   ) 
}
export default MultiLineChartCard