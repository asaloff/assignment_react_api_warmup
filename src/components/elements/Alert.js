import React from 'react';

const Alert = ({type, message}) => {
  if (message) {
    return (
      <div className={`alert alert-${ type }`} role="alert">
        {message}
      </div>
    );
  } else {
    return;
  }
};

Alert.defaultProps = {
  type: 'success'
};

export default Alert;
