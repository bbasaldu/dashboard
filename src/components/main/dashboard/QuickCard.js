import cls from "./QuickCard.module.css";
const QuickCard = (props) => {
  const { style, className, onClick, index } = props;
  const handleClick = () => {
      onClick(index)
  };
  return (
    <button
      type="button"
      className={`${cls.card} ${
        typeof className !== "undefined" ? className : ""
      }`}
      style={style}
      onClick={handleClick}
    >
      {props.children}
    </button>
  );
};
export default QuickCard;
