import Card from "../Card";
import TitleCard from "../TitleCard";
import Table from './Table'
import cls from './Table.module.css'
const TableCard = (props) => {
  const {title="Example Table"} = props
  return (
    <Card>
     {title &&  <TitleCard title={title}/>}
      <Table className={title?cls.title:''}/>
    </Card>
  );
};
export default TableCard;
