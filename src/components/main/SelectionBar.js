import cls from "./SelectionBar.module.css";
import SelectorButton from "./SelectorButton";
import defaultPic from "../../assets/default2.jpeg";
import firePic from "../../assets/fire.png";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PlusIcon from "@mui/icons-material/ControlPoint";
import Item from "./Item";
const SelectionBar = () => {
  return (
    <div className={cls.selectbar}>
      <div className={cls.projectSelect}>
        <SelectorButton>
          <Item imgSrc={firePic}>Project1</Item>
          <ArrowDropDownIcon size={10} />
        </SelectorButton>
        <div className={cls.addContainer}>
          <PlusIcon className={cls.plusIcon} />
        </div>
      </div>
      <div className={cls.userSelect}>
        <SelectorButton>
          <Item imgSrc={defaultPic}>User1</Item>
          <ArrowDropDownIcon size={10} />
        </SelectorButton>
      </div>
    </div>
  );
};
export default SelectionBar;
