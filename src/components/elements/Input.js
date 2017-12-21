import React from 'react';

const Input = props => {
  const classNames = `form-control ${ props.className || '' }`;
  const { user, name, handleInputChange, ...restOfProps } = props;

  if (user) {
    return (
      <input {...restOfProps} className={classNames} name={name} value={user[name]} onChange={handleInputChange} />
    );
  } else {
    return (
      <input {...props} className={classNames} />
    );
  }
};

Input.defaultProps = {
  type: 'text'
};

export default Input;
