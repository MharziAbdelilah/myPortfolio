import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaPaperPlane } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { BsEmojiSmile, BsThreeDots } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './chatBot.css';
import { getSystemPrompt } from './systemPrompt';
import { useLanguage } from '../../context/LanguageContext';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const { currentLang } = useLanguage();
  const [theme, setTheme] = useState(document.body.classList.contains('light') ? 'light' : 'dark');

  // AI Context Management
  const [aiContext, setAiContext] = useState({
    currentTopic: '',
    userIntent: '',
    conversationFlow: [],
    lastResponse: null,
    confidenceScore: 1.0,
    languagePreference: currentLang,
    interactionHistory: []
  });

  // Update AI context based on user interaction
  const updateAiContext = (message, type = 'user') => {
    setAiContext(prev => ({
      ...prev,
      currentTopic: detectTopic(message),
      conversationFlow: [...prev.conversationFlow, { type, content: message }],
      lastResponse: type === 'assistant' ? message : prev.lastResponse,
      interactionHistory: [...prev.interactionHistory, {
        timestamp: Date.now(),
        type,
        content: message,
        topic: detectTopic(message)
      }]
    }));
  };

  // Simple topic detection
  const detectTopic = (message) => {
    const topics = {
      projects: /project|portfolio|work|github/i,
      contact: /contact|email|reach|message/i,
      skills: /skill|technology|stack|framework/i,
      experience: /experience|work|job|career/i,
      about: /about|who|background|education/i
    };

    for (const [topic, pattern] of Object.entries(topics)) {
      if (pattern.test(message)) return topic;
    }
    return 'general';
  };

  // Update theme when body class changes
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setTheme(document.body.classList.contains('light') ? 'light' : 'dark');
        }
      });
    });

    observer.observe(document.body, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      if (messages.length === 0) {
        handleInitialMessage();
      }
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [messages, isOpen]);

  const handleInitialMessage = async () => {
    setIsLoading(true);
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192',
          messages: [
            {
              role: 'assistant',
              content: "Hi! I'm Abdelilah, a software engineer. How can I help you?"
            },
            getSystemPrompt(currentLang),
            {
              role: 'user',
              content: 'Who are you?'
            }
          ]
        })
      };

      const apiUrl = process.env.NODE_ENV === 'production'
        ? '/api/chat.php'
        : 'http://localhost:8000/api/chat.php';

      console.log('Sending request to:', apiUrl);
      const response = await fetch(apiUrl, options);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.message || 'Unknown error occurred');
      }

      if (data.choices && data.choices[0]?.message?.content) {
        setMessages([{
          type: 'bot',
          content: data.choices[0].message.content
        }]);
      } else {
        throw new Error('Invalid response format from API');
      }
    } catch (error) {
      console.error('Error fetching initial message:', error);
      setMessages([{
        type: 'bot',
        content: 'I apologize, but I encountered an error. Please try again later.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced message handling with AI context
  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!newMessage.trim() || isLoading) return;

    const userMessage = newMessage.trim();
    setNewMessage('');
    setIsLoading(true);
    updateAiContext(userMessage, 'user');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: getSystemPrompt(currentLang) },
            ...messages.map(m => ({
              role: m.role,
              content: m.content
            })),
            { role: 'user', content: userMessage }
          ],
          aiContext: aiContext // Send AI context to backend
        })
      });

      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      
      const assistantMessage = data.choices[0].message.content;
      updateAiContext(assistantMessage, 'assistant');
      
      setMessages(prev => [
        ...prev,
        { role: 'user', content: userMessage },
        { role: 'assistant', content: assistantMessage }
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [
        ...prev,
        { role: 'user', content: userMessage },
        { role: 'assistant', content: 'I apologize, but I encountered an error. Please try again.' }
      ]);
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className={`chatbot-container ${theme}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`chat-window ${theme}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="chat-header">
              <div className="header-title">
                <div className="avatar-container">
                  <FaRobot className="avatar-icon" />
                  <span className="status-dot"></span>
                </div>
                <div className="header-info">
                  <div className="bot-name">Abdelilah MHARZI</div>
                  <div className="online-status">Active now</div>
                </div>
              </div>
              <div className="header-actions">
                <button className="action-button">
                  <BsThreeDots />
                </button>
                <button 
                  className="close-button"
                  onClick={() => setIsOpen(false)}
                >
                  <IoClose />
                </button>
              </div>
            </div>

            <div className="chat-messages" onScroll={() => setShowWelcome(false)}>
              {showWelcome && (
                <div className="welcome-message">
                  <h3>👋 Welcome!</h3>
                  <p>I'm here to assist you with any questions about my expertise in software engineering and marketing.</p>
                </div>
              )}
              
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`message ${message.type}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.content}
                  </ReactMarkdown>
                  <div className="message-time">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div 
                  className="typing-indicator"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-input">
              <form onSubmit={handleSendMessage} className="input-container">
                <button type="button" className="emoji-button">
                  <BsEmojiSmile />
                </button>
                <input
                  ref={inputRef}
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="message-input"
                  disabled={isLoading}
                />
                <button 
                  type="submit" 
                  className={`send-button ${newMessage.trim() && !isLoading ? 'active' : ''}`}
                  disabled={!newMessage.trim() || isLoading}
                >
                  <FaPaperPlane />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button 
        className={`chat-button ${theme}`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaRobot className="bot-icon" />
        {!isOpen && messages.length === 0 && (
          <motion.div 
            className="notification-dot"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1 }}
          />
        )}
      </motion.button>
    </div>
  );
};

export default ChatBot;