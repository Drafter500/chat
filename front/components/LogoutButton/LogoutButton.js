import React from 'react';
import PropTypes from 'prop-types';


class LogoutButton extends React.Component {

  render() {
    return (
      <button
        className="logoutButton"
        onClick={this.props.onClick}
      >
        Logout
      </button>
    );
  }
}

LogoutButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default LogoutButton;
