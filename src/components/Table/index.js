import Card from "../Card";
import cls from "./Table.module.css";
const testHeaders = ["header1", "header2", "header3"];
const testDiv = <div>Hello</div>;
const testRows = [
  [1, 2, testDiv],
  [3, 4, testDiv],
  [5, 6, testDiv],
];
const Table = (props) => {
  //   const { data } = props;
  //   const { headers , rows} = data

  return (
    <Card>
      <table className={cls.table}>
        <tbody>
          <tr className={cls.headersWrapper}>
            {testHeaders.map((header) => {
              return <th key={`header_${header}`}>{header}</th>;
            })}
          </tr>
          {testRows.map((row, i) => {
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
