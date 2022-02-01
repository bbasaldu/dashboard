import cls from "./Card.module.css";
const Card = (props) => {
  return (
    <div className={[cls.cardWrapper, cls.cardWrapperMobile].join(" ")}>
      <div className={cls.content}>{props.children}</div>
    </div>
  );
};
export default Card;
