import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initInspectProtection } from './utils/disableInspect.js'

// Initialize DevTools / Inspect Protection globally
initInspectProtection()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
