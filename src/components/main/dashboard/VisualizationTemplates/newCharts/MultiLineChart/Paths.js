import * as d3 from "d3";
import { useEffect, useState } from "react";
const pathColors = ["#C5D4EB", "#D3EBE8", "#FEF0F0", "#FDD9DB", "#EDCCDC"];
const handleEnter = (enter, data) => {
    console.log(enter)
    const path = enter.append('path')
        //.attr('d', line)
    path.attr("len", function () {
        return this.getTotalLength();
      });
      path
        .attr('opacity', 1)
        .attr("stroke-dasharray", function () {
          const len = d3.select(this).attr("len");
          return `${len} ${len}`;
        })
        .attr("stroke-dashoffset", function(){return d3.select(this).attr('len')})
        .transition()
        .duration(1000)
        .attr("stroke-dashoffset", 0)   
    //id={`${id}_${lineData.label}`}
            // opacity={dataState.opaque?0:1}
            // fill="none"
            // stroke={pathColors[i]}
            // strokeWidth={2}
            // strokeLinecap="round"
            // d={line(lineData.pointData)}
}
const handleExit = (exit, data, setDataState) => {
    exit.transition().duration(2000)
    .attr("stroke-dashoffset", function(){return d3.select(this).attr('len')})
    .on('end', () => setDataState({data, opaque: false}))

}
const changeData = (paths, data, setDataState) => {
    paths
        .data(data)
        .join(
            enter => handleEnter(enter, data),
            update => {},
            exit => handleExit(exit, data, setDataState)
        )

}
const Paths = (props) => {
  const { vars, data, id } = props;
  const [dataState, setDataState] = useState({data, opaque:true});
    const [initalState, setInitialState] = useState(data)
  const yScale = vars.yScale;
  const xScale = vars.xScale;
  const line = d3
    .line()
    .x((d, i) => xScale(d.x))
    .y((d, i) => yScale(d.y))
    .curve(d3.curveCatmullRom.alpha(0.5));


  //inital  
  useEffect(() => {
    const paths = d3.select(`#${id}_path_g`).selectAll("path");
    paths.data(initalState)
    //changeData(paths, initalState)
        

    paths.attr("len", function () {
      return this.getTotalLength();
    });
    paths
        .attr('opacity', 1)
      .attr("stroke-dasharray", function () {
        const len = d3.select(this).attr("len");
        return `${len} ${len}`;
      })
      .attr("stroke-dashoffset", function(){return d3.select(this).attr('len')})
      .transition()
      .duration(1000)
      .attr("stroke-dashoffset", 0)
      .on('end', () => setDataState({data: initalState, opaque: false}))
  }, [id,initalState]);

  //on data changes
  useEffect(() => {
    //enter, leave functions based on lastState vs new props**
    if(data.length !== dataState.data.length){
        console.log('here')
        changeData(d3.select(`#${id}_path_g`).selectAll("path"), data, setDataState)
    }

  },[data, dataState, id])

  return (
    <g id={`${id}_path_g`}>
      {dataState.data.map((lineData, i) => {
        return (
          <path
            key={`${id}_${lineData.label}`}
            id={`${id}_${lineData.label}`}
            opacity={dataState.opaque?0:1}
            fill="none"
            stroke={pathColors[i]}
            strokeWidth={2}
            strokeLinecap="round"
            d={line(lineData.pointData)}
          ></path>
        );
      })}
    </g>
  );
};
export default Paths;
