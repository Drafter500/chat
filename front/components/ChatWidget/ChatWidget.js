import React from 'react';
import $ from 'jquery';
import './styles/main.sass';


class ChatWidget extends React.Component {

  componentWillMount() {
    this.socket = io();
  }

  handleSendClick = () => {
    const message = $(this.inputMessage).text();
    this.socket.emit('chat message', message);
    $(this.inputMessage).text('');
  }

  render() {
    return (
      <section className="chatWidget">
        <div className="chatWidget-messageBox" />
        <div className="chatWidget-participantList" />
        <div className="chatWidget-controlsPanel">
          <span
            className="chatWidget-controlsPanel-textInput"
            contentEditable
            ref={(el) => { this.inputMessage = el; }}
           />
          <button
            className="chatWidget-controlsPanel-sendButton"
            onClick={this.handleSendClick}
          >
            Send
          </button>
        </div>
      </section>
    );
  }
}

export default ChatWidget;
