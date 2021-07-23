import classes from "./Dashboard.module.css";
import LevelOneContainer from "./LevelOneContainer";
import LineChart from "./VisualizationTemplates/LineChart";
const DashBoard = () => {
  //make array of 12 objects for each month and 30-31 elements to simulate data for each end of the day for each month
  const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  

  const lineChartData = [
    {
      label: "line1",
      pointData: [
        { x: new Date("2020-01-01 00:00:00"), y: 40 },
        { x: new Date("2020-01-10 00:00:00"), y: 80 },
        { x: new Date("2020-01-20 00:00:00"), y: 30 },

        { x: new Date("2020-02-01 00:00:00"), y: 50 },
        { x: new Date("2020-03-01 00:00:00"), y: 55 },
        { x: new Date("2020-04-01 00:00:00"), y: 75 },
        { x: new Date("2020-05-01 00:00:00"), y: 30 },
        { x: new Date("2020-06-01 00:00:00"), y: 45 },
        { x: new Date("2020-07-01 00:00:00"), y: 55 },
        { x: new Date("2020-08-01 00:00:00"), y: 15 },
        { x: new Date("2020-09-01 00:00:00"), y: 10 },
        { x: new Date("2020-10-01 00:00:00"), y: 20 },
        { x: new Date("2020-11-01 00:00:00"), y: 40 },

        { x: new Date("2020-12-01 00:00:00"), y: 65 },
        { x: new Date("2020-12-31 00:00:00"), y: 70 },
      ],
    },
  ];
  return (
    <div className={classes.container}>
      <LevelOneContainer>
        <div>Title</div>
        <LineChart id="lineChart1" data={lineChartData} />
      </LevelOneContainer>
      <LevelOneContainer>2</LevelOneContainer>
      <LevelOneContainer>3</LevelOneContainer>
      <LevelOneContainer>4</LevelOneContainer>
    </div>
  );
};
export default DashBoard;
