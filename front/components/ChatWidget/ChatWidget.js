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
    const userName = prompt('User name:');
    console.log(userName);
    this.socket = io({
      query: {
        username: userName,
      }
    });
    this.socket.on('message arrived', (answer) => {
      console.log('message arrived event caught');
      this.setState({ messages: this.state.messages.concat(answer)});
    });
  }

  handleSendClick = () => {
    const message = $(this.inputMessage).text();
    this.socket.emit('chat message', message);
    $(this.inputMessage).text('');
  }

  render() {
    console.log(this.state.messages);
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
