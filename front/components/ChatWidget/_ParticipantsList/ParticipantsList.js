import React from 'react';
import PropTypes from 'prop-types';


function ParticipantsList(props) {
  const { participants, className, parentClassPrefix } = props;
  return (
    <div className={`${parentClassPrefix}-participantList ${className}`}>
      {
        participants.map(user => (
          <p
            className={`${parentClassPrefix}-participantList--${user.gender}`}
          >
            {user.username}
          </p>)
          )
      }
    </div>
  );
}

ParticipantsList.propTypes = {
  participants: PropTypes.shape({
    username: PropTypes.string,
    gender: PropTypes.string,
  }).isRequired,
  className: PropTypes.string.isRequired,
  parentClassPrefix: PropTypes.string.isRequired,
};

export default ParticipantsList;
