import React from 'react';
import PropTypes from 'prop-types';
import { CONNECTION_EVENT } from '../constants';


function Message(props) {
  const { message, parentClassPrefix } = props;
  return (
    <p className={`${parentClassPrefix}-message`}>
      { message.type === CONNECTION_EVENT ?
        <span className={`${parentClassPrefix}-message--connectionEvent`}>
          {`${message.userName} ${message.message}`}
        </span> :
        `${message.userName}: ${message.message}`
      }
    </p>
  );
}

Message.propTypes = {
  message: PropTypes.shape({
    userName: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
  parentClassPrefix: PropTypes.string.isRequired,
};

export default Message;
