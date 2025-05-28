import { useState, useEffect } from 'react'
import { popupStyles } from './styles'

export const Popup: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  // Synchronize state between popups
  useEffect(() => {
    const handleStorageChange = (
      changes: Record<string, any>,
      area: string
    ) => {
      if (area === 'sync' && 'extensionEnabled' in changes) {
        setIsEnabled(changes.extensionEnabled.newValue)
      }
    }

    chrome.storage.onChanged.addListener(handleStorageChange)
    return () => chrome.storage.onChanged.removeListener(handleStorageChange)
  }, [])

  // Fetch and set the initial state
  useEffect(() => {
    const fetchState = async () => {
      const { extensionEnabled } =
        await chrome.storage.sync.get('extensionEnabled')
      const enabled = extensionEnabled ?? true
      setIsEnabled(enabled)
      setIsLoading(false)
    }

    fetchState()
  }, [])

  const handleToggle = async () => {
    if (isLoading) return

    const newState = !isEnabled
    setIsEnabled(newState)

    // Update storage
    await chrome.storage.sync.set({ extensionEnabled: newState })
  }

  return (
    <div style={popupStyles.container}>
      <div style={popupStyles.innerContainer}>
        <h1 style={popupStyles.title}>AI Extension</h1>

        <div
          onClick={handleToggle}
          style={{
            ...popupStyles.toggleButton,
            ...(isEnabled
              ? popupStyles.toggleButtonEnabled
              : popupStyles.toggleButtonDisabled),
          }}
        >
          <div
            style={{
              ...popupStyles.circle,
              transform: isEnabled ? 'translateX(32px)' : 'translateX(0)',
            }}
          />
        </div>

        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <span
            style={
              isEnabled ? popupStyles.activeText : popupStyles.inactiveText
            }
          >
            {isEnabled ? 'Extension Active' : 'Extension Inactive'}
          </span>

          <p style={popupStyles.description}>
            {isEnabled
              ? 'Hover on text to see definitions'
              : 'Toggle to enable AI assistant for text'}
          </p>
        </div>
      </div>
    </div>
  )
}
