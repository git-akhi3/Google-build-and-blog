import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatInterface from './pages/ChatInterface';
import Home from './pages/Home';
import { Analytics } from "@vercel/analytics/react"

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<ChatInterface />} />
        </Routes>
      </Router>
      <Analytics />
    </>
  );
};

export default App;
