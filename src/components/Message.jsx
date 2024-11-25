import React from 'react';

const Message = ({ message, userType }) => {
  return (
    <div className={`${userType}-message`}>
      {message}
    </div>
  );
};

export default Message;
