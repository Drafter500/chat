import React from 'react';
import PropTypes from 'prop-types';


function Header(props) {
  return (
    <div className="topPanel">
      <a href="/" className="topPanel-logo">Nice Chat</a>
      {props.children}
    </div>
  );
}

Header.propTypes = {
  children: PropTypes.node,
};

Header.defaultProps = {
  children: null,
};

export default Header;
