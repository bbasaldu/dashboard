import { useRef, useState } from "react";
import Arrow from "../Arrow";
import cls from "./DropDown.module.css";
const DropDown = (props) => {
  const { options, onChange } = props;
  const [showOptions, setShowOptions] = useState(false);
  //const [checkedOptions, setCheckedOptions] = useState(options);
  const checkedOptions = useRef(options)
  const handleChange = (ev) => {
    const isChecked = ev.target.checked;
    const currOpt = ev.target.value;
    const lastCheckedOptions = checkedOptions.current.slice()
    if(!isChecked){
      checkedOptions.current = lastCheckedOptions.filter(opt => opt !== currOpt)
    }
    else {
      checkedOptions.current = [...lastCheckedOptions, currOpt]
    }
    onChange(checkedOptions.current)
  };
  const handleClick = (opt) => {
    document.getElementById(opt).click()
  }
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
            <li onClick={() => handleClick(opt)} className={cls.labelContainer} key={opt}>
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
