// src/components/ChatBox.jsx
import React, { useState, useEffect } from "react";
import { saveMessage, fetchChatHistory } from "../services/firebase";
import { chatWithHistoricalFigure } from "../services/chatService";
import historicalFigures from "../datasets/historical_figures.json";
import Message from './Message';

const ChatBox = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedFigure, setSelectedFigure] = useState("Albert Einstein");
  const [isLoading, setIsLoading] = useState(false);

  const currentFigure = historicalFigures.find(figure => figure.figure === selectedFigure);

  const handleSend = async () => {
    if (!inputMessage.trim() || isLoading) return;

    setIsLoading(true);
    setChatHistory(prev => [...prev, { message: inputMessage, userType: 'user' }]);
    const messageToSend = inputMessage;
    setInputMessage('');

    try {
      const aiResponse = await chatWithHistoricalFigure(messageToSend, selectedFigure);
      setChatHistory(prev => [
        ...prev,
        { message: aiResponse, userType: 'ai' }
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header with profile picture */}
      <div className="bg-[#A67C52] p-4 text-white">
        <div className="flex items-center space-x-4">
          <img 
            src={currentFigure.image} 
            alt={currentFigure.figure} 
            className="w-12 h-12 rounded-full object-cover border-2 border-white"
          />
          <div className="flex-1">
            <h2 className="font-bold text-lg">{currentFigure.figure}</h2>
            <p className="text-sm opacity-90">{currentFigure.era}</p>
          </div>
          <select
            value={selectedFigure}
            onChange={(e) => setSelectedFigure(e.target.value)}
            className="bg-[#8B6544] text-white rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#A67C52]"
          >
            {historicalFigures.map(figure => (
              <option key={figure.figure} value={figure.figure}>
                {figure.figure}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#D1C2AC]">
        {chatHistory.map((chat, index) => (
          <Message 
            key={index} 
            message={chat.message} 
            userType={chat.userType}
            figureImage={currentFigure.image}
          />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg">
              Typing...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-gray-200 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
