import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: 'bot' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBoxRef = useRef(null);

  // Scroll to bottom of chat when messages update
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user'
    };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Make GET request to FastAPI backend
      const response = await axios.get('https://teachmate-backend.onrender.com/chat/', {
        params: {
          prompt: inputMessage
        },
        headers: {
          'Accept': 'application/json'
        }
      });

      // Add bot response
      const botMessage = {
        id: Date.now() + 1,
        text: response.data.message || 'No response received',
        sender: 'bot'
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Comprehensive error handling
      const errorMessage = {
        id: Date.now() + 2,
        text: error.response 
          ? (error.response.data.detail || 'An error occurred while processing your message')
          : 'Network error. Please check your connection.',
        sender: 'bot'
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-w-3xl h-screen text-gray-700 bg-background-primary bg-gray-100 rounded-3xl p-8 flex flex-col">
      <div id="mid-container" className="flex flex-col h-full">
        <div className="teacher-greeting mb-4">
          <p className="text-3xl font-bold" id="greeting">
            Hello, Rakesh! You can Chat here with Me!
          </p>
        </div>
        <div className="chat-container flex flex-col flex-grow bg-white rounded-2xl shadow-md">
          {/* Chat Messages Box */}
          <div 
            ref={chatBoxRef}
            id="chat-box" 
            className="flex-grow overflow-y-auto p-4 space-y-4"
          >
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div 
                  className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                    msg.sender === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-2xl">
                  Typing...
                </div>
              </div>
            )}
          </div>
          
          {/* Input Container */}
          <div className="input-container p-4 border-t flex items-center space-x-2">
            <input 
              type="text" 
              id="user-input" 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..." 
              className="flex-grow p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button 
              id="send-btn"
              onClick={handleSendMessage}
              disabled={isLoading || inputMessage.trim() === ''}
              className={`
                ${isLoading || inputMessage.trim() === '' 
                  ? 'bg-blue-300 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600'
                } 
                text-white px-4 py-2 rounded-xl transition-colors
              `}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat;