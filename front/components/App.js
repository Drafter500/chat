import React from 'react';


class App extends React.Component {

  render() {
    return (
      <div>
        App Page
        {this.props.children}
      </div>
    )
  }
};

export default App;
