import { useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { db } from './firebase';
import { updateDoc, doc } from 'firebase/firestore';
const TableData = ({ task }) => {
  const [edit, setedit] = useState(false);

  const [valuename, setvaluename] = useState(task.text);
  const [emails, setemails] = useState(task.email);
  const [phone, setphone] = useState(task.mobile);
  const value = (event) => {
    setvaluename(event.target.value);
  };
  const email = (event) => {
    setemails(event.target.value);
  };
  const phones = (event) => {
    setphone(event.target.value);
  };
  const togglecomplete = async (task) => {
    await updateDoc(doc(db, 'forms', task.id), {
      completed: !task.completed,
      text: valuename,
      email: emails,
      mobile: phone,
    });
  };

  return (
    <div>
      <div className="flex">
        <tr
          className={
            task.completed
              ? 'table_row table_row_flex selected'
              : 'table_row table_row_flex '
          }
        >
          <td contentEditable={task.completed ? 'true' : 'false'}>
            {task.text}
          </td>
          <td contentEditable={task.completed ? 'true' : 'false'}>
            {task.email}
          </td>
          <td contentEditable={task.completed ? 'true' : 'false'}>
            {task.mobile}
          </td>
        </tr>
        <button
          onClick={() => {
            setedit((pre) => !pre);
            togglecomplete(task);
          }}
          className="btn"
        >
          <AiFillEdit size={15} />
          <span>{task.completed ? 'UPDATE' : 'EDIT'}</span>
        </button>
      </div>

      {edit === true && (
        <div className="input">
          <input
            type="text"
            placeholder="name"
            onChange={value}
            value={valuename}
          />
          <input
            type="email"
            placeholder="email"
            onChange={email}
            value={emails}
            required
          />
          <input
            placeholder="num"
            type="number"
            onChange={phones}
            value={phone}
            required
          />
        </div>
      )}
    </div>
  );
};

export default TableData;
