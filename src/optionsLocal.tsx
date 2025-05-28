import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './chrome-extension/global.css'
import { Options } from './chrome-extension/components'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Options />
  </StrictMode>
)
