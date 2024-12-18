import React from 'react';
import ChatBox from './components/ChatBox';
import TestComponent from './components/test';
import './index.css';
import { Bot } from 'lucide-react';

// Add import for Henny Penny font


const App = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background div */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/src/assets/Untitled design (1).jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0
        }}
      />
      
      {/* Content div */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-3xl h-[600px] bg-[#D1C2AC] shadow-lg rounded-lg overflow-hidden p-6 flex flex-col">
          <h1 
            className="text-5xl  text-center mb-6 text-[#683B2B] flex-shrink-0"
            style={{ 
              fontFamily: "'Tilt Prism', cursive",
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
};

export default App;
