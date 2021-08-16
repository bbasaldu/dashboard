import * as d3 from "d3";
import { useEffect } from "react";
const XAxis = (props) => {
  const { vars } = props;
  //text y defaults to tickSize + 3, dy defaults to 0.71em
  
  return (
    <g
      className={props.className}
      id={`${props.id}_xAxis`}
      transform={`translate(${0}, ${vars.height})`}
      textAnchor="middle"
    >
      {vars.xScale.ticks().map((tickValue, i) => {
        return (
          <g
            transform={`translate(${vars.xScale(tickValue)}, 0)`}
            key={`${props.id}_xTick_${i}`}
          >
            <line y2={-vars.height} stroke={vars.options.theme.second}></line>
            
            <text id={d3.timeFormat("%b%y")(tickValue)} y={vars.tickSize+3} dy="0.71em" fill={vars.options.theme.second}>
              {d3.timeFormat("%b")(tickValue)}
            </text>
          </g>
        );
      })}
    </g>
  );
};
export default XAxis;
