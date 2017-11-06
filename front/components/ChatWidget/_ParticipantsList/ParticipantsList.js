import React from 'react';
import PropTypes from 'prop-types';
import BackArrowIcon from '../../../icons/BackArrowIcon';


class ParticipantsList extends React.Component {
  closePanel = () => {

  }

  render() {
    const {
      participants,
      closeHandler,
      className,
      parentClassPrefix,
    } = this.props;

    return (
      <aside className={`${parentClassPrefix}-participantList ${className}`}>
        <div
          className={'chatWidget-body-participantList-backButton'}
          onClick={closeHandler}
        >
          <BackArrowIcon
            className={'chatWidget-body-participantList-backButton-icon'}
          />
        </div>
        {
          participants.map(user => (
            <p
              className={`${parentClassPrefix}-participantList--${user.gender}`}
            >
              {user.username}
            </p>),
            )
        }
      </aside>
    );
  }
}

ParticipantsList.propTypes = {
  participants: PropTypes.shape({
    username: PropTypes.string,
    gender: PropTypes.string,
  }).isRequired,
  closeHandler: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  parentClassPrefix: PropTypes.string.isRequired,
};

export default ParticipantsList;
