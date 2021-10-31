import cls from "./SideButton.module.css";
const SideButton = (props) => {
  const { icon, selected, index, onClick, style } = props;
  const Icon = icon;
  const active = selected === index;
  const activeClass = active ? cls.active : "";
  const handleClick = () => {
    if (typeof index !== 'undefined') {
      onClick(index);
    }
  };
  return (
    <button
      type="button"
      className={`${cls.container} ${activeClass}`}
      onClick={handleClick}
      style={style}
    >
      <div className={cls.left}>
        <Icon size="16" className={cls.icon} />
      </div>
      <div className={cls.right}>{props.children}</div>
      {active && <div className={cls.dot}></div>}
    </button>
  );
};
export default SideButton;
