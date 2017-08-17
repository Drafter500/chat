import React from 'react';
import $ from 'jquery';
import history from '../../config/history';


class ChatWidget extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      participants: [],
    };
  }

  componentWillMount() {
    //TODO: move it to the service
    $.get('/roomInfo').done(() => {
      this.socket = io();
      this.socket.on('message arrived', (answer) => {
        this.setState({ messages: this.state.messages.concat(answer)});
      });
      this.socket.on('participants updated', (participants) => {
        this.setState({ participants });
      });
    })
    .fail( e => {
      if (e.status === 401) {
        history.replace('/');
      }
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
        <div className="chatWidget-participantList">
        {
          this.state.participants.map(user => <p>{user.username}</p>)
        }
        </div>
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
