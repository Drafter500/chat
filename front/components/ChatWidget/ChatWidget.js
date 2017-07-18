import React from 'react';
import './styles/main.sass';


class ChatWidget extends React.Component {

  handleSendClick = () => {
    const message = this.inputMessage.childNodes[0].nodeValue;
    // Call message service here
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
