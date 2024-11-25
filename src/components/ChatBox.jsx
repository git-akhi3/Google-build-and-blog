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

  useEffect(() => {
    const loadChatHistory = async () => {
      const history = await fetchChatHistory(selectedFigure);
      setChatHistory(history);
    };
    loadChatHistory();
  }, [selectedFigure]);

  const handleSend = async () => {
    if (!inputMessage.trim() || isLoading) return;

    setIsLoading(true);
    try {
      // Save user message
      await saveMessage(inputMessage, "user", selectedFigure);

      // Get AI response using Gemini
      const aiResponse = await chatWithHistoricalFigure(inputMessage, selectedFigure);
      await saveMessage(aiResponse, "ai", selectedFigure);

      // Update chat history
      setChatHistory(prev => [
        ...prev,
        { message: inputMessage, userType: "user", figure: selectedFigure },
        { message: aiResponse, userType: "ai", figure: selectedFigure }
      ]);
      setInputMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbox">
      <select 
        value={selectedFigure}
        onChange={(e) => setSelectedFigure(e.target.value)}
        className="figure-select"
      >
        {historicalFigures.map(figure => (
          <option key={figure.figure} value={figure.figure}>
            {figure.figure} ({figure.era})
          </option>
        ))}
      </select>
      <div className="chat-history">
        {chatHistory.map((chat, index) => (
          <Message 
            key={index}
            message={chat.message}
            userType={chat.userType}
          />
        ))}
        {isLoading && <div className="loading-message">Thinking...</div>}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask a question..."
          disabled={isLoading}
        />
        <button 
          onClick={handleSend} 
          disabled={isLoading}
        >
          {isLoading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
