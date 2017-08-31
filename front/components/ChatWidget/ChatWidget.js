import React from 'react';
import $ from 'jquery';
import RoomService from '../../services/room';


class ChatWidget extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      participants: [],
    };
  }

  newMessageHandler = (message) => {
    this.setState({ messages: this.state.messages.concat(message) });
  }

  participantsUpdateHandler = (participants) => {
    this.setState({ participants });
  }

  componentWillMount() {
    RoomService.enterTheRoom(this.newMessageHandler, this.participantsUpdateHandler);
  }

  handleMessageSend = () => {
    const message = $(this.inputMessage).text();
    RoomService.sendMessage(message);
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
        <div className="chatWidget-body">
          <div className="chatWidget-body-messageBox">
          {
            this.state.messages.map(msg => <p className="chatWidget-body-messageBox-message">{msg}</p>)
          }
          </div>
          <div className="chatWidget-body-participantList">
          {
            this.state.participants.map(user => <p>{user.username}</p>)
          }
          </div>
        </div>
        <div className="chatWidget-controlsPanel">
          <div
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
