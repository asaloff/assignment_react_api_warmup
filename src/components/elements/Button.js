import React from 'react';

const Button = (props) => {
  const {type, size, color, children} = props;
  const sizeClass = size ? `btn-${size}` : '';

  return (
    <button
      type={type || "button"}
      className={`btn btn-${color} ${sizeClass}`}
    >
      {children}
    </button>
  );
};

export default Button;
