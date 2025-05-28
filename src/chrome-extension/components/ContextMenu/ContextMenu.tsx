import { createPortal } from 'react-dom'
import { TContextMenu } from './types'
import { useState, useEffect } from 'react'
import { contextMenuStyles } from './styles'

export const ContextMenu: React.FC<TContextMenu> = ({
  position,
  selectedText,
  onAction1,
  onAction2,
  onClose,
  isLoading,
}) => {
  const [activeButton, setActiveButton] = useState<
    'action1' | 'action2' | null
  >(null)
  const [menuPosition] = useState(position)

  useEffect(() => {
    if (!isLoading) {
      setActiveButton(null)
    }
  }, [isLoading])

  const handleAction = (
    actionType: 'action1' | 'action2',
    callback: (text: string) => void
  ) => {
    setActiveButton(actionType)
    callback(selectedText)
  }

  return createPortal(
    <div
      id="text-hover-context-menu"
      style={contextMenuStyles.contextMenuContainer(menuPosition)}
      onMouseLeave={onClose}
    >
      <div
        style={{
          ...contextMenuStyles.button,
          ...contextMenuStyles.button1,
        }}
        onMouseOver={(e) => {
          if (activeButton !== 'action1') {
            e.currentTarget.style.transform = 'scale(1.05)'
            e.currentTarget.style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.2)'
            e.currentTarget.style.backgroundColor = '#2563eb'
          }
        }}
        onMouseOut={(e) => {
          if (activeButton !== 'action1') {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'
            e.currentTarget.style.backgroundColor = ''
          }
        }}
        onClick={() => handleAction('action1', onAction1)}
      >
        {activeButton === 'action1' && isLoading ? (
          <div style={contextMenuStyles.spinner}></div>
        ) : (
          'What does it mean'
        )}
      </div>

      <div
        style={{
          ...contextMenuStyles.button,
          ...contextMenuStyles.button2,
          marginTop: '12px',
        }}
        onMouseOver={(e) => {
          if (activeButton !== 'action2') {
            e.currentTarget.style.transform = 'scale(1.05)'
            e.currentTarget.style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.2)'
            e.currentTarget.style.backgroundColor = '#e5e7eb'
          }
        }}
        onMouseOut={(e) => {
          if (activeButton !== 'action2') {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'
            e.currentTarget.style.backgroundColor = ''
          }
        }}
        onClick={() => handleAction('action2', onAction2)}
      >
        {activeButton === 'action2' && isLoading ? (
          <div style={contextMenuStyles.spinner}></div>
        ) : (
          'Save this note'
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </div>,
    document.body
  )
}
