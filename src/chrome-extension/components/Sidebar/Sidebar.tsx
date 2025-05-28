import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { TSidebar } from './types'

export const Sidebar: React.FC<TSidebar> = ({
  isCollapsed,
  onToggle,
  content,
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (sidebarRef.current) {
      sidebarRef.current.style.transform = isCollapsed
        ? 'translateX(100%)'
        : 'translateX(0)'
    }
    if (toggleRef.current) {
      toggleRef.current.style.right = isCollapsed ? '0' : '300px'
    }
  }, [isCollapsed])

  return createPortal(
    <>
      <div
        ref={sidebarRef}
        className="extension-sidebar"
        style={{
          position: 'fixed',
          top: '0',
          right: '0',
          width: '300px',
          height: '100vh',
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          zIndex: 999999,
          transition: 'transform 0.3s ease-in-out',
          transform: isCollapsed ? 'translateX(100%)' : 'translateX(0)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
            background: 'linear-gradient(to right, #3b82f6, #6366f1)',
            color: '#fff',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
          }}
        >
          <h2
            style={{
              fontSize: '18px',
              fontWeight: '600',
            }}
          >
            AI Helper
          </h2>
          <button
            onClick={onToggle}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '24px',
              color: 'white',
              fontWeight: 'bold',
              transition: 'transform 0.2s ease-in-out',
            }}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.2)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            &times;
          </button>
        </div>
        <div
          style={{
            padding: '16px',
            height: 'calc(100vh - 60px)',
            overflowY: 'auto',
            backgroundColor: 'rgba(247, 250, 252, 0.7)',
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>

      <button
        ref={toggleRef}
        className="extension-sidebar-toggle"
        onClick={onToggle}
        aria-label={isCollapsed ? 'Open sidebar' : 'Close sidebar'}
        style={{
          position: 'fixed',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'linear-gradient(to right, #3b82f6, #6366f1)',
          border: 'none',
          borderRadius: '8px 0 0 8px',
          padding: '16px',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
          zIndex: 999999,
          right: isCollapsed ? '0' : '300px',
          transition: 'right 0.3s ease, transform 0.3s ease',
          color: 'white',
          fontSize: '24px',
          fontWeight: 'bold',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'scale(1.1) translateY(-50%)'
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1) translateY(-50%)'
        }}
      >
        {isCollapsed ? '◀' : '▶'}
      </button>
    </>,
    document.body
  )
}
