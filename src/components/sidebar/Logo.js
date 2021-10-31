import cls from "./Logo.module.css";
import logo from "../../assets/logo-generic.svg";
const Logo = (props) => {
  return (
      <div className={cls.container}>
        <img src={logo} alt="logo" />
      </div>
  );
};
export default Logo;
