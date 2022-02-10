import Card from "../Card";
import TitleCard from "../TitleCard";
import Table from "../TableCard/Table.js";
import cls from "./PieTableCombo.module.css";
import PieChart from "../PieChart";
const PieLegendSquare = (props) => {
  const { color } = props;
  return (
    <div
      style={{ backgroundColor: color }}
      className={cls.pieLegendSquare}
    ></div>
  );
};
const data = [
  { label: "label1", value: 25, color: "rgb(44, 217, 208)" },
  { label: "label2", value: 25, color: "rgb(94, 172, 201)" },
  { label: "label3", value: 25, color: "rgb(228, 151, 15)" },
  { label: "label4", value: 25, color: "rgb(204, 48, 53)" },
];
const headers = ["Legend", "Label", "Value"];
const rows = data.map((d) => {
  return [<PieLegendSquare color={d.color} />, d.label, d.value];
});
const PieTableCombo = () => {
  return (
    <Card>
      <TitleCard title="Totals" />
      <div className={cls.content}>
        <div className={cls.split}>
          <Table headers={headers} rows={rows} />
        </div>
        <div className={cls.split}>
          <PieChart className={cls.noTitle} data={data} />
        </div>
      </div>
    </Card>
  );
};
export default PieTableCombo;
