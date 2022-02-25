import cls from "./layouts.module.css";
const Layout = (props) => {
  return (
    <div
      className={[
        cls.mainContent,
        
      ].join(' ')}
    >
      {props.children}
    </div>
  );
};
export default Layout;
