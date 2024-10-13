'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Image from 'next/image';

interface Message {
  sender: string;
  content: string;
  timestamp: Date;
}

interface Chat {
  matchName: string;
  messages: Message[];
}

export default function ChatPage() {
  const [matches, setMatches] = useState<string[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const storedMatches = localStorage.getItem('matches');
    if (storedMatches) {
      const parsedMatches = JSON.parse(storedMatches);
      setMatches(parsedMatches);
      setChats(parsedMatches.map((match: string) => ({ matchName: match, messages: [] })));
    }
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      const updatedChats = chats.map(chat => {
        if (chat.matchName === selectedChat) {
          return {
            ...chat,
            messages: [...chat.messages, { sender: 'You', content: newMessage, timestamp: new Date() }]
          };
        }
        return chat;
      });
      setChats(updatedChats);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex" style={{ height: 'calc(100vh - 200px)' }}>
          {/* Matches list */}
          <div className="w-1/3 bg-gray-100 p-4 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Your Matches</h2>
            {matches.map((match, index) => (
              <div
                key={index}
                className={`p-2 mb-2 rounded cursor-pointer ${selectedChat === match ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
                onClick={() => setSelectedChat(match)}
              >
                {match}
              </div>
            ))}
          </div>
          {/* Chat window */}
          <div className="w-2/3 flex flex-col">
            {selectedChat ? (
              <>
                <div className="bg-gray-200 p-4 font-bold">{selectedChat}</div>
                <div className="flex-grow p-4 overflow-y-auto">
                  {chats.find(chat => chat.matchName === selectedChat)?.messages.map((message, index) => (
                    <div key={index} className={`mb-2 ${message.sender === 'You' ? 'text-right' : 'text-left'}`}>
                      <span className="bg-blue-100 rounded px-2 py-1 inline-block">
                        {message.content}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-gray-100 flex">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-grow mr-2 p-2 rounded border"
                    placeholder="Type a message..."
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-grow flex items-center justify-center text-gray-500">
                Select a match to start chatting
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
