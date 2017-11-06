import React from 'react';


class BackArrowIcon extends React.Component {
  render() {
    const { className } = this.props;

    return (
      <svg className={className} version="1.1" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
        <path d="M512 256l-247.742-247.742v148.645h-264.258v198.193h264.258v148.645z"></path>
      </svg>
    );
  }
}

export default BackArrowIcon;
