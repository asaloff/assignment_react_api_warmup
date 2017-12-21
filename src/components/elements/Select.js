import React from 'react';

const Select = props => {
  const { options, ...restOfProps } = props;
  const optionsElements = options.map(option => {
    return <option value={option} key={option}>{option}</option>;
  });

  return (
    <select className='form-control' {...restOfProps}>
      {optionsElements}
    </select>
  );
};

export default Select;
