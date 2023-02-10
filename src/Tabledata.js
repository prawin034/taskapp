const TableData = ({ task }) => {
  return (
    <tr className="table_row">
      <div className="table_row_box">
        <td className="table_row_data">{task.text}</td>
        <td className="table_row_data">{task.EMAIL}</td>
      </div>
    </tr>
  );
};

export default TableData;
