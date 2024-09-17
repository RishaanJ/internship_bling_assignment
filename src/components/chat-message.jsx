import React from 'react';
import './chat-message.css';

const ChatMessageBubble = ({ profilePicture, content, timestamp, isOwnMessage }) => {
  return (
    <div className={`message-bubble ${isOwnMessage ? 'own-message' : ''}`}>
      {!isOwnMessage && <img src={profilePicture} alt="Profile" className="profile-picture" />}
      <div className="message-content">
        <p className="message-text">{content}</p>
        <span className="message-timestamp">{timestamp}</span>
      </div>
    </div>
  );
};

export default ChatMessageBubble;
