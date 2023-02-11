import React from 'react';
import useHook from './hooks/useform';
const NewRowCompo = () => {
  const { Invalid: EnteredValueInvalid } = useHook(
    (value) => value.trim() !== ''
  );
  const { Invalid: EnteredEmailInvalid } = useHook(
    (value) =>
      value.trim() !== '' && value.includes('@') && value.includes('gmail.com')
  );
  const { Invalid: EnteredValueMOBILEINVALID } = useHook(
    (value) => value.trim().length > 9
  );
  const { Invalid: EnteredValuePanINVALID } = useHook(
    (value) => value.trim().length > 9
  );
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
  return (
    <div className="home">
      <div className="home_formbox">
        <div className={inputnamevalidity}>
          <input className="" type="text" placeholder="NAME" />
        </div>
        <div className={emailvalidity}>
          <input className="" type="email" placeholder="EMAIL" />
        </div>
        <div className={numbervalidity}>
          <input className="" type="number" placeholder="MOBILE" />
        </div>
        <div className={PANvalidity}>
          <input className="" type="text" placeholder="PAN" />
        </div>
      </div>
    </div>
  );
};

export default NewRowCompo;
