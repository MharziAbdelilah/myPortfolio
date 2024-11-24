import React, { useState, useEffect, useRef } from 'react';
import './chatBot.css';
import { FaRobot } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

function ChatBot() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot" }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: "user" }]);
      setNewMessage("");
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: "Thanks for your message! I'll get back to you soon.", 
          sender: "bot" 
        }]);
      }, 1000);
    }
  };

  const ChatInterface = () => (
    <div className="chat-interface">
      <div className="chat-header">
        <h3>Chat Support</h3>
        <button 
          onClick={() => setShowChat(false)}
          aria-label="Close chat"
        >
          <IoClose size={24} />
        </button>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}-message`}>
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          aria-label="Message input"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );

  const ChatbotButton = () => (
    <div className="chatbot-button-container">
      <button
        onClick={() => setShowChat(!showChat)}
        className="chatbot-button"
        aria-label="Open chat"
      >
        <FaRobot className="bot-icon" />
      </button>
    </div>
  );

  return (
    <div className="chatbot-fixed">
      <ChatbotButton />
      {showChat && <ChatInterface />}
    </div>
  );
}

export default ChatBot; 