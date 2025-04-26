import React from 'react';
import ChatBox from '../components/ChatBox';
import '../index.css';
import Background from '../assets/bg.jpg';

const ChatInterface = () => {
    return (
        <div className="relative min-h-screen">
          {/* Background div */}
          <div 
            className="absolute inset-0 h-full w-full"
            style={{
              backgroundImage: `url(${Background})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 0
            }}
          />
          
          {/* Content div */}
          <div className="relative z-10 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-3xl h-[600px] bg-[#D1C2AC] shadow-lg rounded-lg overflow-hidden p-6 flex flex-col">
              <h1 
                className="text-5xl font-tilt text-center mb-6 text-[#683B2B] flex-shrink-0"
                style={{ 
                  textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                Historical Figure Simulator
              </h1>
              <div className="flex-1 overflow-hidden">
                <ChatBox />
              </div>
            </div>
          </div>
        </div>
      );
    }
export default ChatInterface;