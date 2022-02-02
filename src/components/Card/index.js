import cls from "./Card.module.css";
const Card = (props) => {
  const {className=''} = props
  return (
    <div className={[cls.cardWrapper, cls.cardWrapperMobile, className].join(" ")}>
      <div className={cls.content}>{props.children}</div>
    </div>
  );
};
export default Card;
