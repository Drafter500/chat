import React from 'react';
import $ from 'jquery';
import RoomService from '../../services/room';


const CONNECTION_EVENT = 'connectionEvent';

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
    this.messageBox.scrollTop = this.messageBox.scrollHeight;
  }

  participantsUpdateHandler = (participants, details) => {
    this.setState({ participants });
    if (details && details.event && details.credentials) {
      let participantEvent;
      if (['connected', 'disconnected'].includes(details.event)) {
        const verb = details.event === 'connected' ? 'joined' : 'left';
        participantEvent = {
          userName: details.credentials.username,
          message: `has ${verb}...`,
          type: CONNECTION_EVENT,
        }
      }

      participantEvent && this.setState({ messages: this.state.messages.concat(participantEvent) });
    }
  }

  previousMessagesHandler = (oldMessages) => {
    this.setState({ messages: this.state.messages.concat(oldMessages)});
  }

  componentWillMount() {
    RoomService.enterTheRoom(this.newMessageHandler, this.participantsUpdateHandler, this.previousMessagesHandler);
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

  // TODO: refactor this method, split into smaller components
  render() {
    return (
      <section className="chatWidget">
        <div className="chatWidget-body">
          <div
            ref={(mb) => { this.messageBox = mb; }}
            className="chatWidget-body-messageBox"
          >
          {
            this.state.messages.map(msg => (
              <p className="chatWidget-body-messageBox-message">
              { msg.type === CONNECTION_EVENT ?
               <span className='chatWidget-body-messageBox-message--connectionEvent'>{`${msg.userName} ${msg.message}`}</span> :
               `${msg.userName}: ${msg.message}`
                }
              </p>
              ))
          }
          </div>
          <div className="chatWidget-body-participantList">
          {
            this.state.participants.map(user => (
            <p
              className={`chatWidget-body-participantList--${user.gender}`}
            >
            {user.username}
            </p>))
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
