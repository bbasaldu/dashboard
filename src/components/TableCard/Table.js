import ArrowValue from "../ArrowValue";
import cls from "./Table.module.css";
const testHeaders = ["Label", "Value", "% Total", "% Change"];

const testRows = [
  [1, 2, '40%',<ArrowValue value={23}/>],
  [3, 4, '40%',<ArrowValue value={-43}/>],
  [5, 6, '40%',<ArrowValue value={23}/>],
];
const Table = (props) => {
    const {headers=testHeaders, rows=testRows, className} = props
    return (
        <table className={[cls.table, className].join(' ')}>
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
    )
}
export default Table