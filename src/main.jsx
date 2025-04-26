import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Home from './pages/Home.jsx'

import './index.css';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Home />
    <App />
  </StrictMode>,
)
