import { useRef, useState } from "react";
import classes from "./DateFilter.module.css";
const DateFilter = (props) => {
  const fromRef = useRef();
  const toRef = useRef();
  const [validRange, setValidRange] = useState([true, true]);

  const { onRangeChange } = props;
  const handleRangeChange = () => {
    const fromArr = fromRef.current.value.split("/");
    const from = new Date(`2020-${fromArr[0]}-${fromArr[1]}T00:00:00`);
    const toArr = toRef.current.value.split("/");
    const to = new Date(`2020-${toArr[0]}-${toArr[1]}T00:00:00`);
    const fromStringArray = fromRef.current.value.split("");
    const toStringArray = toRef.current.value.split("");
    let fromValid;
    if (
      !isNaN(fromStringArray[0]) &&
      !isNaN(fromStringArray[1]) &&
      fromStringArray[2] === "/" &&
      !isNaN(fromStringArray[3]) &&
      !isNaN(fromStringArray[4])
    ) {
      fromValid = true;
      if (from.toString() === "Invalid Date") {
        fromValid = false;
      }
    } else {
      fromValid = false;
    }

    let toValid;
    if (
      !isNaN(toStringArray[0]) &&
      !isNaN(toStringArray[1]) &&
      toStringArray[2] === "/" &&
      !isNaN(toStringArray[3]) &&
      !isNaN(toStringArray[4])
    ) {
      toValid = true;
      if (to.toString() === "Invalid Date") {
        toValid = false;
      }
    } else {
      toValid = false;
    }
    if (from > to) {
      fromValid = false;
      toValid = false;
    }
    setValidRange([fromValid, toValid]);

    if (fromValid && toValid && from < to) {
      onRangeChange([from, to]);
    }
  };

  return (
    <div className={classes.container}>
      <div>
        <span>From: </span>
        <input
          type="text"
          placeholder="mm/dd"
          ref={fromRef}
          defaultValue="01/01"
          style={{
            backgroundColor: validRange[0] === false ? "#FFC1CC" : "initial",
          }}
        />
      </div>
      <div>
        <span>To: </span>
        <input
          type="text"
          placeholder="mm/dd"
          ref={toRef}
          defaultValue="12/30"
          style={{
            backgroundColor: validRange[1] === false ? "#FFC1CC" : "initial",
          }}
        />
      </div>
      <button className={classes.btn} type="button" onClick={handleRangeChange}>
        Set Range
      </button>
    </div>
  );
};
export default DateFilter;
