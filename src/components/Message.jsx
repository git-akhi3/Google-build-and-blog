import React from "react";
import { User2, Bot } from "lucide-react";

const Message = ({ message, userType, figureImage }) => {
  const isUser = userType === "user";

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-start max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {!isUser && (
          <img 
            src={figureImage} 
            alt="Historical figure" 
            className="w-8 h-8 rounded-full mr-2 object-cover"
          />
        )}
        <div 
          className={`px-4 py-2 rounded-lg ${
            isUser 
              ? 'bg-[#F5E6D7] text-gray-800 ml-2' 
              : 'bg-[#BFA58A] text-white mr-2'
          }`}
        >
          {message}
        </div>
      </div>
    </div>
  );
};

export default Message;
