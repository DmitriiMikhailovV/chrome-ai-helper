import { createPortal } from 'react-dom'
import { TContextMenu } from './types'

export const ContextMenu: React.FC<TContextMenu> = ({
  position,
  selectedText,
  onAction1,
  onAction2,
  onClose,
}) => {
  return createPortal(
    <div
      id="text-hover-context-menu"
      style={{
        position: 'fixed',
        left: `${position.x - 3}px`,
        top: `${position.y - 3}px`,
        zIndex: 9999999,
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '12px',
        padding: '20px',
        width: '180px',
        textAlign: 'center',
        transition: 'all 0.3s ease-out',
      }}
      onMouseLeave={onClose}
    >
      <button
        onClick={() => onAction1(selectedText)}
        style={{
          width: '100%',
          padding: '12px 16px',
          borderRadius: '16px',
          background: 'linear-gradient(to right, #3b82f6, #6366f1)',
          color: 'white',
          fontWeight: '500',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition:
            'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          marginBottom: '12px',
          cursor: 'pointer',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)'
          e.currentTarget.style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.2)'
          e.currentTarget.style.backgroundColor = '#2563eb'
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'
          e.currentTarget.style.backgroundColor =
            'linear-gradient(to right, #3b82f6, #6366f1)'
        }}
      >
        What does it mean
      </button>

      <button
        onClick={() => onAction2(selectedText)}
        style={{
          width: '100%',
          padding: '12px 16px',
          borderRadius: '16px',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          color: '#333',
          fontWeight: '500',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition:
            'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          cursor: 'pointer',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)'
          e.currentTarget.style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.2)'
          e.currentTarget.style.backgroundColor = '#e5e7eb'
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.7)'
        }}
      >
        Save this note
      </button>
    </div>,
    document.body
  )
}
