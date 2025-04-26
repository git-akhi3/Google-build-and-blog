import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

const Message = ({ message, userType, figureImage, onPlay, isSpeaking, canSpeak }) => {
  return (
    <div className={`flex ${userType === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex ${userType === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-2`}>
        {userType === 'ai' && (
          <img 
            src={figureImage}
            alt="Historical Figure"
            className="w-8 h-8 rounded-full object-cover"
          />
        )}
        <div className={`px-4 py-3 rounded-lg max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg ${
          userType === 'user' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'
        }`}>
          <div className="whitespace-pre-wrap">{message}</div>
          
          {/* Audio controls for AI messages */}
          {userType === 'ai' && canSpeak && (
            <div className="mt-2 flex justify-end">
              <button 
                onClick={onPlay}
                className={`p-1 rounded-full ${isSpeaking ? 'bg-red-100' : 'bg-gray-100'} hover:bg-gray-200`}
                title={isSpeaking ? "Speaking..." : "Play voice"}
              >
                <FontAwesomeIcon icon={isSpeaking ? faPause : faPlay} size="sm" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;