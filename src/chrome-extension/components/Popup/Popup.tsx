import { useState, useEffect } from 'react'

export const Popup: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    chrome.storage.sync.get(['extensionEnabled'], (result) => {
      const storedValue = result.extensionEnabled ?? true
      setIsEnabled(storedValue)
      setIsLoading(false)

      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
          chrome.tabs.sendMessage(tabs[0].id, {
            type: 'TOGGLE_EXTENSION',
            enabled: storedValue,
          })
        }
      })
    })
  }, [])

  const handleToggle = () => {
    if (isLoading) return

    const newState = !isEnabled
    setIsEnabled(newState)
    chrome.storage.sync.set({ extensionEnabled: newState })

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, {
          type: 'TOGGLE_EXTENSION',
          enabled: newState,
        })
      }
    })
  }

  return (
    <div
      style={{
        width: '320px',
        padding: '24px',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '12px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1
          style={{
            fontSize: '20px',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '24px',
          }}
        >
          AI Extension
        </h1>

        <div
          onClick={handleToggle}
          style={{
            width: '64px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '9999px',
            padding: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            background: isEnabled
              ? 'linear-gradient(to right, #3b82f6, #6366f1)'
              : 'rgba(107, 114, 128, 0.4)',
            transition: 'background-color 0.3s ease',
          }}
        >
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '9999px',
              backgroundColor: '#ffffff',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              transform: isEnabled ? 'translateX(32px)' : 'translateX(0)',
              transition: 'transform 0.3s ease',
            }}
          />
        </div>

        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <span
            style={{
              fontSize: '14px',
              fontWeight: '500',
              color: isEnabled ? '#059669' : '#4B5563',
            }}
          >
            {isEnabled ? 'Extension Active' : 'Extension Inactive'}
          </span>

          <p
            style={{
              fontSize: '12px',
              color: '#6B7280',
              marginTop: '8px',
              maxWidth: '240px',
              lineHeight: '1.4',
            }}
          >
            {isEnabled
              ? 'Hover on text to see definitions'
              : 'Toggle to enable AI assistant for text'}
          </p>
        </div>
      </div>
    </div>
  )
}
