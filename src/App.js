import { db } from './firebase';
import { query, collection, onSnapshot, addDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import useHook from './hooks/useform';
import TableData from './Tabledata';
import NewRowCompo from './NewRowCompo';

function App() {
  const [task, settask] = useState([]);
  const [newrow, setnewrow] = useState(false);

  const {
    value: EnteredFirstName,
    isvalid: EnteredValueFirstNameIsValid,
    Invalid: EnteredValueInvalid,
    ValueHandler: firstNameHandler,
    Blur: firtNameBlur,
    reset: FirstName,
  } = useHook((value) => value.trim() !== '');
  const {
    value: EnteredEmail,
    isvalid: EnteredEmailvalid,
    Invalid: EnteredEmailInvalid,
    ValueHandler: Emailhandler,
    Blur: EmailBLur,
    reset: email,
  } = useHook(
    (value) =>
      value.trim() !== '' && value.includes('@') && value.includes('gmail.com')
  );
  const {
    value: EnteredMOBILE,
    isvalid: EnteredValueMOBILEISVALID,
    Invalid: EnteredValueMOBILEINVALID,
    ValueHandler: MOBILENameHandler,
    Blur: MOBILEBlur,
    reset: MOBILE,
  } = useHook((value) => value.trim().length > 9);
  const {
    value: EnteredPan,
    isvalid: EnteredValuePanISVALID,
    Invalid: EnteredValuePanINVALID,
    ValueHandler: PanNameHandler,
    Blur: PanBlur,
    reset: Pan,
  } = useHook((value) => value.trim().length > 9);

  let formValid = false;

  if (
    EnteredValueFirstNameIsValid &&
    EnteredEmailvalid &&
    EnteredValueMOBILEISVALID &&
    EnteredValuePanISVALID
  ) {
    formValid = true;
  }

  //CREATE TODO

  const createTodo = async (event) => {
    event.preventDefault();

    if (
      EnteredFirstName.trim() === '' &&
      !EnteredEmail.includes('@') &&
      EnteredMOBILE.trim().length < 9 &&
      EnteredPan.trim().length < 9
    ) {
      alert('PLEASE ENTER ALL VALUES');
    }

    if (
      EnteredValueFirstNameIsValid &&
      EnteredEmailvalid &&
      EnteredValueMOBILEISVALID &&
      EnteredValuePanISVALID
    ) {
      await addDoc(collection(db, 'forms'), {
        text: EnteredFirstName,
        email: EnteredEmail,
        mobile: EnteredMOBILE,
        completed: false,
      });
    } else {
      return alert('WITHOUT ENTERING ALL DATA FORM WILL NOT SUBMITTED!');
    }

    FirstName();
    email();
    MOBILE();
    Pan();
  };

  const inputnamevalidity = EnteredValueInvalid
    ? 'form-control invalid'
    : 'form-control';
  const emailvalidity = EnteredEmailInvalid
    ? 'form-control invalid'
    : 'form-control';

  const numbervalidity = EnteredValueMOBILEINVALID
    ? 'form-control invalid'
    : 'form-control';
  const PANvalidity = EnteredValuePanINVALID
    ? 'form-control invalid'
    : 'form-control';

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

  //add new tasks

  const newrowhandler = () => {
    setnewrow((oldtask) => !oldtask);
  };

  // const errorhandler = () => {
  //   setisEntering(true);
  // };
  // UPDATE TASK

  return (
    <div className="home">
      <div className="home_compo">
        <form onSubmit={createTodo} className="home_form">
          <div className="home_form_box">
            <div className={inputnamevalidity}>
              {EnteredValueInvalid && (
                <p className="error-text">PLEASE ENTER YOUR NAME</p>
              )}

              <input
                onChange={firstNameHandler}
                onBlur={firtNameBlur}
                value={EnteredFirstName}
                className=""
                type="text"
                placeholder="NAME"
              />
            </div>
            <div className={emailvalidity}>
              {EnteredEmailInvalid && (
                <p className="error-text">PLEASE ENTER YOUR EMAIL</p>
              )}
              <input
                onChange={Emailhandler}
                onBlur={EmailBLur}
                value={EnteredEmail}
                className=""
                type="email"
                placeholder="EMAIL"
              />
            </div>
            <div className={numbervalidity}>
              {EnteredValueMOBILEINVALID && (
                <p className="error-text">PLEASE ENTER YOUR NUMBER</p>
              )}
              <input
                onChange={MOBILENameHandler}
                onBlur={MOBILEBlur}
                value={EnteredMOBILE}
                className=""
                type="number"
                placeholder="MOBILE"
              />
            </div>
            <div className={PANvalidity}>
              {EnteredValuePanINVALID && (
                <p className="error-text">PLEASE ENTER YOUR PAN</p>
              )}
              <input
                onChange={PanNameHandler}
                onBlur={PanBlur}
                value={EnteredPan}
                className=""
                type="text"
                placeholder="PAN"
              />
            </div>
            {newrow && <NewRowCompo />}
            <button
              onClick={newrowhandler}
              type="button"
              className="home_form_box_btn"
            >
              {newrow ? 'BACK' : 'ADD ROW'}
            </button>
          </div>
          <div
            className={
              formValid
                ? 'home_form_btnbox home_form_btnbox_stretch'
                : 'home_form_btnbox'
            }
          >
            <button className="" type="submit">
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
              <TableData task={task} key={index} />
            ))}
          </tbody>
        </table>
        {task.length === 0 && (
          <h1 className="notification">👀 NO FORM DATA, ADD DATA TO STORE</h1>
        )}
      </div>
    </div>
  );
}

export default App;
