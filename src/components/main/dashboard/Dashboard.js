import classes from "./Dashboard.module.css";
import LevelOneContainer from "./LevelOneContainer";
import TitleCard from "./TitleCard";
import VerticalSplitContainer from "./VerticalSplitContainer";
import Headers from "./VisualizationTemplates/Headers";
import LegendColor from "./VisualizationTemplates/LegendColor";
import LineChart from "./VisualizationTemplates/LineChart";
import PercentChange from "./VisualizationTemplates/PercentChange";
import PieChart from "./VisualizationTemplates/PieChart";
import QuadRowCard from "./VisualizationTemplates/QuadRowCard";
import Row from "./VisualizationTemplates/Row";
import StatCard from "./VisualizationTemplates/StatCard";
import Table from "./VisualizationTemplates/Table";
//icons
import bookIcon from '../../../assets/fi-rr-book.svg'
import timeIcon from '../../../assets/fi-rr-clock.svg'
import usersIcon from '../../../assets/fi-rr-users.svg'
import screenIcon from '../../../assets/fi-rr-screen.svg'


const DashBoard = () => {

  const getIcon = (icon) => {
    return (
      <img src={icon} alt={'svgIcon'} />
    )
  }
  //fake data for line chart
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
  const len = lineChartData[0].pointData.length

  //fake data for table
  const headers = ["Label", "Value", "% from Total", "% Change"]
  const row1 = ["Label1", "80,000", "20%"]
  const row2 = ["Label2", "60,000", "42%"]
  const row3 = ["Label3", "3,400", "12%"]
  const row4 = ["Label4", "114,000", "10%"]

  //fake data for pie chart and table legend
  const pieChartHeaders = ["Legend", "Label", "Value"]
  const pieChartData = {
      total: 100,
      pieData: [
          {label: 'label1', value: 25},
          {label: 'label2', value: 25},
          {label: 'label3', value: 25},
          {label: 'label4', value: 25}
      ]
  }
  const pieColors = ['#2cd9d0',"#5eacc9", "#e4970f", "#cc3035"]
  const color = (color) => {
      return <LegendColor color={color}/>
  }
  return (
    <div className={classes.container}>
      <LevelOneContainer>
        <TitleCard title="Year Total" value={lineChartData[0].pointData[len-1].y}/>
        <LineChart id="lineChart1" data={lineChartData} />
      </LevelOneContainer>
      <LevelOneContainer className={classes.levelOneBlank}>
          <QuadRowCard>
            <StatCard value="43.4%" percentValue={`${12}%`} positive={true} icon={getIcon(screenIcon)}>
              Rate of Something
            </StatCard>
            <StatCard value="4.2" percentValue={`${1.2}%`} positive={true} icon={getIcon(bookIcon)}>
              Pages Read per Vist
            </StatCard>
          </QuadRowCard>
          <QuadRowCard>
            <StatCard value="320K" percentValue={`${2.1}%`} positive={false} icon={getIcon(usersIcon)}>
              Monthly Visitors
            </StatCard>
            <StatCard value="00:03:27" percentValue={`${2.4}%`} positive={false} icon={getIcon(timeIcon)}>
              Avg. Time Spent
            </StatCard>
          </QuadRowCard>
      </LevelOneContainer>
      <LevelOneContainer className={classes.levelOneGrowVertical}>
            <TitleCard title="Totals" />
          <VerticalSplitContainer>
          <Table className={classes.flexGrow}>
            <Headers headers={pieChartHeaders}/>
            <Row data={[color(pieColors[0]), "label1", 25]}>
            </Row>
            <Row data={[color(pieColors[1]), "label2", 25]}>
            </Row>
            <Row data={[color(pieColors[2]), "label3", 25]}>
            </Row>
            <Row data={[color(pieColors[3]), "label4", 25]}>
            </Row>
        </Table>
        <PieChart id="pieChart1" data={pieChartData}/>
          </VerticalSplitContainer>
      </LevelOneContainer>
      <LevelOneContainer className={classes.levelOneGrowVertical}>
        <TitleCard title="Table Label" />
        <Table>
            <Headers headers={headers}/>
            <Row data={row1}>
                <PercentChange value={`${24}%`} positive={true}/>
            </Row>
            <Row data={row2}>
                <PercentChange value={`${24}%`} positive={true}/>
            </Row>
            <Row data={row3}>
                <PercentChange value={`${24}%`} positive={true}/>
            </Row>
            <Row data={row4}>
                <PercentChange value={`${24}%`} positive={false}/>
            </Row>
        </Table>
      </LevelOneContainer>

      

      <LevelOneContainer>
        <TitleCard title="Year Total" value={lineChartData[0].pointData[len-1].y}/>
        <LineChart id="lineChart2" data={lineChartData} />
      </LevelOneContainer>
      <LevelOneContainer className={classes.levelOneBlank}>
          <QuadRowCard>
            <StatCard value="43.4%" percentValue={`${12}%`} positive={true} icon={getIcon(screenIcon)}>
              Rate of Something
            </StatCard>
            <StatCard value="4.2" percentValue={`${1.2}%`} positive={true} icon={getIcon(bookIcon)}>
              Pages Read per Vist
            </StatCard>
          </QuadRowCard>
          <QuadRowCard>
            <StatCard value="320K" percentValue={`${2.1}%`} positive={false} icon={getIcon(usersIcon)}>
              Monthly Visitors
            </StatCard>
            <StatCard value="00:03:27" percentValue={`${2.4}%`} positive={false} icon={getIcon(timeIcon)}>
              Avg. Time Spent
            </StatCard>
          </QuadRowCard>
      </LevelOneContainer>
      <LevelOneContainer className={classes.levelOneGrowVertical}>
            <TitleCard title="Totals" />
          <VerticalSplitContainer>
          <Table className={classes.flexGrow}>
            <Headers headers={pieChartHeaders}/>
            <Row data={[color(pieColors[0]), "label1", 25]}>
            </Row>
            <Row data={[color(pieColors[1]), "label2", 25]}>
            </Row>
            <Row data={[color(pieColors[2]), "label3", 25]}>
            </Row>
            <Row data={[color(pieColors[3]), "label4", 25]}>
            </Row>
        </Table>
        <PieChart id="pieChart2" data={pieChartData}/>
          </VerticalSplitContainer>
      </LevelOneContainer>
      <LevelOneContainer className={classes.levelOneGrowVertical}>
        <TitleCard title="Table Label" />
        <Table>
            <Headers headers={headers}/>
            <Row data={row1}>
                <PercentChange value={`${24}%`} positive={true}/>
            </Row>
            <Row data={row2}>
                <PercentChange value={`${24}%`} positive={true}/>
            </Row>
            <Row data={row3}>
                <PercentChange value={`${24}%`} positive={true}/>
            </Row>
            <Row data={row4}>
                <PercentChange value={`${24}%`} positive={false}/>
            </Row>
        </Table>
      </LevelOneContainer>
    </div>
  );
};
export default DashBoard;
