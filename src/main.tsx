import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './chrome-extension/global.css'
import { Popup } from './chrome-extension/components'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Popup />
  </StrictMode>
)
