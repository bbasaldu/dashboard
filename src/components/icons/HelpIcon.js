import cls from './iconStyles.module.css'
const HelpIcon = (props) => {
  const { size, style } = props;
  return (
    <div style={style} className={cls.helpIcon}>
      <svg
        width={size}
        height={size}
        id="Outline"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="#2cd9d0"
      >
        <title>89 interrogation</title>
        <path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z" />
        <path d="M12.717,5.063A4,4,0,0,0,8,9a1,1,0,0,0,2,0,2,2,0,0,1,2.371-1.967,2.024,2.024,0,0,1,1.6,1.595,2,2,0,0,1-1,2.125A3.954,3.954,0,0,0,11,14.257V15a1,1,0,0,0,2,0v-.743a1.982,1.982,0,0,1,.93-1.752,4,4,0,0,0-1.213-7.442Z" />
        <rect x="11" y="17" width="2" height="2" rx="1" />
      </svg>
    </div>
  );
};
export default HelpIcon;
