const YAxis = (props) => {
  const { vars } = props;
  return (
    <g className={props.className} id={`${props.id}_yAxis`} textAnchor="end" transform={`translate(${vars.margin.left}, ${0})`}>
      {vars.yScale.ticks().map((tickValue, i) => {
        return (
          <g
            transform={`translate(0, ${vars.yScale(tickValue)})`}
            key={`${props.id}_xTick_${i}`}
          >
            <text x={(-1*vars.tickSize)-3} dy={'0.32em'} fill={vars.options.theme.second}>{tickValue}</text>
          </g>
        );
      })}
    </g>
  );
};
export default YAxis;
