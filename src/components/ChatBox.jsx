import React, { useState, useEffect, useRef } from "react";
import { saveMessage, fetchChatHistory } from "../services/firebase";
import { chatWithHistoricalFigure } from "../services/chatService";
import historicalFigures from "../datasets/historical_figures.json";
import Message from './Message';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeMute, faVolumeUp, faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';

const ChatBox = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedFigure, setSelectedFigure] = useState("Albert Einstein");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  
  const currentFigure = historicalFigures.find(figure => figure.figure === selectedFigure);

  // Stop any ongoing speech when changing historical figures
  useEffect(() => {
    if (window.responsiveVoice) {
      window.responsiveVoice.cancel();
      setIsSpeaking(false);
    }
  }, [selectedFigure]);

  const speakText = (text) => {
    if (!voiceEnabled) return;
    
    // Clean the text
    const cleanText = text
      .replace(/!\[(.*?)\]\((.*?)\)/g, '') 
      .replace(/\*\*(.*?)\*\*/g, '$1')    
      .replace(/\*(.*?)\*/g, '$1')         
      .replace(/```(.*?)```/gs, '')        
      .replace(/`(.*?)`/g, '')             
      .replace(/^[\W]+/g, '')              
      .replace(/#/g, '');                  
  
    // Get the character's voice from their data
    const voice = currentFigure?.voice || "US English Male";
    
    // Speak using ResponsiveVoice
    if (window.responsiveVoice) {
      setIsSpeaking(true);
      window.responsiveVoice.speak(cleanText, voice, {
        onend: () => setIsSpeaking(false)
      });
    } else {
      console.error("ResponsiveVoice not loaded yet!");
    }
  };
  
  const stopSpeaking = () => {
    if (window.responsiveVoice) {
      window.responsiveVoice.cancel();
      setIsSpeaking(false);
    }
  };

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
    stopSpeaking();
  };

  const handleSend = async () => {
    if (!inputMessage.trim() || isLoading) return;
    
    setIsLoading(true);
    setChatHistory(prev => [...prev, { message: inputMessage, userType: 'user' }]);
    const messageToSend = inputMessage;
    setInputMessage('');
    
    try {
      const response = await chatWithHistoricalFigure(messageToSend, selectedFigure);
      
      // Handle both old API format (string) and new format (object with text and voice)
      const aiResponseText = typeof response === 'string' ? response : response.text;
      
      setChatHistory(prev => [
        ...prev,
        { message: aiResponseText, userType: 'ai' }
      ]);
      
      // Speak the response
      speakText(aiResponseText);
    } catch (error) {
      console.error("Error sending message:", error);
      setChatHistory(prev => [
        ...prev,
        { message: "Sorry, I'm having trouble responding right now.", userType: 'ai' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Speech recognition for speech-to-text functionality
  const [isListening, setIsListening] = useState(false);
  const recognition = useRef(null);

  useEffect(() => {
    // Initialize speech recognition if supported
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      
      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
      };
      
      recognition.current.onend = () => {
        setIsListening(false);
      };
      
      recognition.current.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (!recognition.current) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }
    
    if (isListening) {
      recognition.current.stop();
      setIsListening(false);
    } else {
      stopSpeaking(); // Stop any ongoing speech
      recognition.current.start();
      setIsListening(true);
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
          <button 
            onClick={toggleVoice}
            className="bg-[#8B6544] rounded-full w-10 h-10 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={voiceEnabled ? faVolumeUp : faVolumeMute} />
          </button>
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
            onPlay={() => chat.userType === 'ai' && speakText(chat.message)}
            isSpeaking={isSpeaking && index === chatHistory.length - 1 && chat.userType === 'ai'}
            canSpeak={chat.userType === 'ai' && voiceEnabled}
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
            disabled={isLoading || isListening}
            className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={toggleListening}
            className={`px-4 py-2 ${isListening ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white rounded-lg transition-colors duration-200`}
          >
            <FontAwesomeIcon icon={isListening ? faMicrophoneSlash : faMicrophone} />
          </button>
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