import { db } from './firebase';
import { query, collection, onSnapshot } from 'firebase/firestore';
import { useState, useEffect } from 'react';

import TableData from './Tabledata';
function App() {
  const [task, settask] = useState([]);
  //READ TASK FROM FIREBASE

  useEffect(() => {
    const q = query(collection(db, 'forms'));
    const unsubscribe = onSnapshot(q, (querydata) => {
      let formdata = [];

      querydata.forEach((doc) => {
        formdata.push({ ...doc.data(), id: doc.id });
      });
      settask(formdata);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="home">
      <h1 className="home_heading">TASKS FORM</h1>
      <div className="home_compo">
        <form className="home_form">
          <div className="home_form_box">
            <input
              className="home_form_box_input"
              type="text"
              placeholder="NAME"
              required
            />
            <input
              className="home_form_box_input"
              type="email"
              placeholder="EMAIL"
              required
            />
            <input
              className="home_form_box_input"
              type="number"
              placeholder="MOBILE"
              required
            />
            <input
              className="home_form_box_input"
              type="text"
              placeholder="PAN"
              required
            />
            <button className="home_form_box_btn">ADD ROW</button>
          </div>
          <div className="home_form_btnbox">
            <button className="home_form_btnbox_btn" type="submit">
              SAVE
            </button>
          </div>
        </form>

        <table className="table">
          <thead>
            <tr className="table_row">
              <th className="table_row_heading">NAME</th>
              <th className="table_row_heading">EMAIL</th>
              <th className="table_row_heading">MOBILE</th>
            </tr>
          </thead>
          <tbody>
            {task.map((task, index) => (
              <tr className="table_row table_row_flex">
                <div>
                  <td className="table_row_data">{task.text}</td>
                </div>
                <div>
                  <td className="table_row_data">{task.email}</td>
                </div>
                <div>
                  <td className="table_row_data">{task.mobile}</td>
                </div>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
