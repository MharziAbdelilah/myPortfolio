import React, { useState, useRef, useEffect } from 'react';
import { FaRobot } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import PulseLoader from "react-spinners/PulseLoader";
import './chatBot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputClick = (e) => {
    e.stopPropagation();
  };

  const handleOpen = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      handleInitialMessage();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleInitialMessage = async () => {
    setIsLoading(true);
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'Qwen/Qwen2.5-72B-Instruct-Turbo',
          messages: [
            {
              role: 'assistant',
              content: 'You are a portfolio assistant trained to answer questions about Abdelilah mharzi\'s portfolio. Use the provided portfolio content to respond to any client questions. Stay concise and relevant while being professional and approachable. If a question is unrelated to the portfolio content, politely let the client know.'
            },
            {
              role: 'system',
              content: 'Portfolio Content: About Me: Abdelilah Mharzi is a fifth-year software engineering student in Morocco. Experienced in PHP, Symfony, Angular, and .NET technologies. Specializes in building RESTful APIs and implementing OOP principles. Projects: Barbershop Management App: Angular and Symfony-based app with role-based access, reservation system, and notifications. E-Commerce Website: Laravel-based platform with payment gateway integration and admin dashboards. Task Manager API: .NET Core project demonstrating clean architecture and advanced LINQ usage. Skills: Languages: PHP, C#, JavaScript, SQL. Frameworks: Symfony, ASP.NET Core, Angular. Tools: Docker, Git, Postman, Swagger. Soft Skills: Teamwork, problem-solving, and communication. Education: Bachelor\'s in Software Engineering, expected graduation: June 2024. Achievements: Google Certified Associate Developer. Finalist in Hackathon XYZ for innovative API design.'
            },
            {
              role: 'user',
              content: 'Hello! Can you introduce yourself and tell me what you can help me with?'
            }
          ]
        })
      };

      const apiUrl = process.env.NODE_ENV === 'production' 
        ? '/api/chat'  // Production URL (relative to domain)
        : 'http://localhost:3001/api/chat'; // Development URL

      const response = await fetch(apiUrl, options);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      if (data.choices && data.choices[0]?.message?.content) {
        setMessages([{
          type: 'bot',
          content: data.choices[0].message.content
        }]);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching initial message:', error);
      setMessages([{
        type: 'bot',
        content: 'Hello! I encountered an issue connecting to the server. Please try again later.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'Qwen/Qwen2.5-72B-Instruct-Turbo',
          messages: [
            {
              role: 'assistant',
              content: 'You are a portfolio assistant trained to answer questions about Abdelilah mharzi\'s portfolio. Use the provided portfolio content to respond to any client questions. Stay concise and relevant while being professional and approachable. If a question is unrelated to the portfolio content, politely let the client know.'
            },
            {
              role: 'system',
              content: 'Portfolio Content: About Me: Abdelilah Mharzi is a fifth-year software engineering student in Morocco. Experienced in PHP, Symfony, Angular, and .NET technologies. Specializes in building RESTful APIs and implementing OOP principles. Projects: Barbershop Management App: Angular and Symfony-based app with role-based access, reservation system, and notifications. E-Commerce Website: Laravel-based platform with payment gateway integration and admin dashboards. Task Manager API: .NET Core project demonstrating clean architecture and advanced LINQ usage. Skills: Languages: PHP, C#, JavaScript, SQL. Frameworks: Symfony, ASP.NET Core, Angular. Tools: Docker, Git, Postman, Swagger. Soft Skills: Teamwork, problem-solving, and communication. Education: Bachelor\'s in Software Engineering, expected graduation: June 2024. Achievements: Google Certified Associate Developer. Finalist in Hackathon XYZ for innovative API design.'
            },
            {
              role: 'user',
              content: userMessage
            }
          ]
        })
      };

      const apiUrl = process.env.NODE_ENV === 'production' 
        ? '/api/chat'  // Production URL (relative to domain)
        : 'http://localhost:3001/api/chat'; // Development URL

      const response = await fetch(apiUrl, options);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data.choices && data.choices[0]?.message?.content) {
        setMessages(prev => [...prev, {
          type: 'bot',
          content: data.choices[0].message.content
        }]);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        type: 'bot',
        content: 'I apologize, but I encountered an error processing your message. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="chatbot-container">
      <button className="chat-button" onClick={handleOpen}>
        <FaRobot className="bot-icon" />
      </button>

      {isOpen && (
        <div className="chat-window" onClick={handleInputClick}>
          <div className="chat-header">
            <h3>Portfolio Assistant</h3>
            <button className="close-button" onClick={handleClose}>
              <IoClose size={24} />
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.type}-message`}>
                {message.content}
              </div>
            ))}
            {isLoading && (
              <div className="message bot-message loading">
                <PulseLoader color="#864ff5" size={8} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input-form" onSubmit={handleSendMessage}>
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || !inputMessage.trim()}>
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;