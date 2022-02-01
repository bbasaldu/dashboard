import { useEffect, useRef, useState } from "react";
import classes from "./LineDropDownMenu.module.css";
const pathColors = ["#98DDCA", "#D5ECC2", "#FFD3B4", "#FFAAA7", "#EDCCDC"];
const LineDropDownMenu = (props) => {
  const { data, id, handleDataChange } = props;
  const btnRef = useRef();
  const checkedRef = useRef()
  const [showOptions, setShowOptions] = useState(false);

  const handleClick = () => {
    setShowOptions((last) => !last);
  };
  const onChange = (ev) => {
    // const temp = Array.from(data);
    const index = ev.target.value;
    const showing = ev.target.checked;
    // temp[index].showing = showing;
    const removedLabel = data[index].label
    //handleDataChange(data.filter(d => d.label !== removedLabel));
    checkedRef.current[index] = showing
    const tempData = []
    data.forEach((d,i) => {
      if(checkedRef.current[i] === true){
        tempData.push(d)
      }
    })
    handleDataChange(tempData)


  };
  useEffect(() => {
    checkedRef.current = []
    data.forEach((d, i) => {
      const elem = document.getElementById(`${id}_${d.label}`);
      elem.setAttribute("checked", true);
      checkedRef.current.push(true)
    });
    
  }, [data, id]);

  return (
    <div className={classes.container}>
      <button
        className={classes.btn}
        type="button"
        onClick={handleClick}
        ref={btnRef}
      >
        Select Lines
      </button>
      <ul
        className={classes.options}
        style={{ visibility: showOptions ? "visible" : "hidden" }}
      >
        {data.map((d, i) => {
          const labelID = `${id}_${d.label}`;
          return (
            <li key={`${labelID}`}>
              <input
                type="checkbox"
                id={`${labelID}`}
                name={d.label}
                value={i}
                onClick={onChange}
              />
              <label htmlFor={`${labelID}`}>
                <div className={classes.lineLegend}>
                    <div className={classes.lineLabel}>{d.label}</div>
                    <div className={classes.lineColor} style={{backgroundColor: pathColors[i]}}></div>
                </div>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default LineDropDownMenu;
