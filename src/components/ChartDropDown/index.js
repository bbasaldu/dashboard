import { useState } from "react";
import Arrow from '../Arrow'
import cls from "./ChartDropDown.module.css";
const ChartDropDown = (props) => {
  const { options, selected, onChange } = props;
  const [showOptions, setShowOptions] = useState(false);
  const handleSelectionChange = (opt) => {
    setShowOptions(last => !last)
    onChange(opt)
  }
  return (
    <div className={cls.dropDownWrapper}>
      <button
        className={cls.currentSelection}
        onClick={() => setShowOptions((last) => !last)}
      >
        {selected}
        <Arrow className={cls.whiteArrow} variant="down"/>
      </button>
      {showOptions && (
        <ul className={cls.selectionList}>
          {options.map((opt) => {
            return <li key={opt} onClick={() => handleSelectionChange(opt)}>{opt}</li>;
          })}
        </ul>
      )}
    </div>
  );
};
export default ChartDropDown;
