import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { Send, User } from 'lucide-react';

const socket = io('http://localhost:4000');

const Chat = () => {
  const { id: roomId } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [userName] = useState(`User-${Math.floor(Math.random() * 1000)}`);
  const scrollRef = useRef();

  useEffect(() => {
    if (roomId) {
      socket.emit('join-room', roomId);
    }

    socket.on('receive-message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off('receive-message');
  }, [roomId]);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const msgData = { roomId, message, sender: userName };
      socket.emit('send-message', msgData);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col w-80 h-full border-l bg-gray-50 shadow-inner">
      <div className="p-4 border-b bg-white flex items-center gap-2">
        <User size={18} className="text-blue-500" />
        <h3 className="font-semibold text-gray-700">Group Chat</h3>
      </div>

      {/* Message List */}
      <div className="flex-grow overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`flex flex-col ${msg.sender === userName ? 'items-end' : 'items-start'}`}
          >
            <span className="text-[10px] text-gray-500 mb-1">{msg.sender}</span>
            <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm ${
              msg.sender === userName 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white text-gray-800 border rounded-tl-none shadow-sm'
            }`}>
              {msg.message}
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={sendMessage} className="p-4 bg-white border-t">
        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow bg-transparent border-none focus:outline-none text-sm p-2"
          />
          <button type="submit" className="text-blue-600 hover:text-blue-800">
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;