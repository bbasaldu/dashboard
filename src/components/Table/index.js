import ArrowValue from "../ArrowValue";
import Card from "../Card";
import TitleCard from "../TitleCard";
import cls from "./Table.module.css";
const testHeaders = ["Label", "Value", "% Total", "% Change"];

const testRows = [
  [1, 2, '40%',<ArrowValue positive={true} value={23}/>],
  [3, 4, '40%',<ArrowValue positive={false} value={43}/>],
  [5, 6, '40%',<ArrowValue positive={true} value={23}/>],
];
const Table = (props) => {
  const {title=null, headers=testHeaders, rows=testRows} = props
  return (
    <Card>
     {title &&  <TitleCard title={title}/>}
      <table className={[cls.table, title?cls.title:''].join(' ')}>
        <tbody>
          <tr className={cls.headersWrapper}>
            {headers.map((header) => {
              return <th key={`header_${header}`}>{header}</th>;
            })}
          </tr>
          {rows.map((row, i) => {
            return (
              <tr key={`row_${i}`}>
                {row.map((value, j) => {
                  return <td key={`row_${i}_item_${j}`}>{value}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
};
export default Table;
