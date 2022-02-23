import { useState } from "react";
import Arrow from "../Arrow";
import cls from "./DropDown.module.css";
const DropDown = (props) => {
  const { options, selected, onChange } = props;
  const [showOptions, setShowOptions] = useState(false);
  const handleChange = (ev) => {
    const isChecked = ev.target.checked;
    const opt = ev.target.value;
    onChange(opt);
  };
  return (
    <div className={cls.dropDownWrapper}>
      <button
        className={cls.currentSelection}
        onClick={() => setShowOptions((last) => !last)}
      >
        Select Lines
        <Arrow className={cls.whiteArrow} variant="down" />
      </button>

      <ul
        className={[
          cls.selectionList,
          showOptions ? cls.show : cls.hidden,
        ].join(" ")}
      >
        {options.map((opt) => {
          return (
            <li key={opt}>
              <input
                defaultChecked
                onChange={handleChange}
                id={opt}
                value={opt}
                type="checkbox"
              />
              <label htmlFor={opt}>{opt}</label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default DropDown;
