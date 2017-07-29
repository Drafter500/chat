import React from 'react';
import $ from 'jquery';
import './styles/main.sass';


class ChatWidget extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }

  componentWillMount() {
    this.socket = io();
    this.socket.on('message arrived', (answer) => {
      this.setState({ messages: this.state.messages.concat(answer)});
    });
  }

  handleMessageSend = () => {
    const message = $(this.inputMessage).text();
    this.socket.emit('chat message', message);
    $(this.inputMessage).text('');
  }

  handleInputKeyPress = (e) => {
    if (e.key == 'Enter') {
      e.preventDefault();
      this.handleMessageSend();
    }
  }

  render() {
    return (
      <section className="chatWidget">
        <div className="chatWidget-messageBox">
        {
          this.state.messages.map(msg => <p>{msg}</p>)
        }
        </div>
        <div className="chatWidget-participantList" />
        <div className="chatWidget-controlsPanel">
          <span
            className="chatWidget-controlsPanel-textInput"
            contentEditable
            ref={(el) => { this.inputMessage = el; }}
            onKeyPress={this.handleInputKeyPress}
           />
          <button
            className="chatWidget-controlsPanel-sendButton"
            onClick={this.handleMessageSend}
          >
            Send
          </button>
        </div>
      </section>
    );
  }
}

export default ChatWidget;
