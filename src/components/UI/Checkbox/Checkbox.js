import React from 'react';

function Checkbox({ label, disabled, ...props }) {
  return (
    <>
      <input type="checkbox" disabled={disabled} {...props} />
      <label>{label}</label>
    </>
  );
}

export default Checkbox;
