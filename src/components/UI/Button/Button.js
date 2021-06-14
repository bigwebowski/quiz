import React from 'react';

const Button = ({ children, disabled, ...props }) => (
  <button type="button" className="btn btn-outline-secondary" disabled={disabled} {...props}>
    {children}
  </button>
);

export default Button;
