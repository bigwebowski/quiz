import React from 'react';

const Button = ({ children, clicked, disabled, ...props }) => (
  <button
    type="button"
    className="btn btn-outline-secondary"
    onClick={clicked}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);

export default Button;
