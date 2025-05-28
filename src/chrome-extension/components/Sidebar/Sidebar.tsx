import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { TSidebar } from './types'
import { sidebarStyles } from './styles'

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
        style={sidebarStyles.container}
      >
        <div style={sidebarStyles.header}>
          <h2 style={sidebarStyles.headerTitle}>AI Helper</h2>
          <button
            onClick={onToggle}
            style={sidebarStyles.closeButton}
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
          style={sidebarStyles.content}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>

      <button
        ref={toggleRef}
        className="extension-sidebar-toggle"
        onClick={onToggle}
        aria-label={isCollapsed ? 'Open sidebar' : 'Close sidebar'}
        style={{
          ...sidebarStyles.toggleButton,
          right: isCollapsed ? '0' : '300px',
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
