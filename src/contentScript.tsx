import ReactDOM from 'react-dom/client'
import { ContextMenu, Sidebar } from './chrome-extension/components'

let isExtensionEnabled = true
let isSidebarCollapsed = true
let geminiResponseText = ''

let sidebarRoot: ReactDOM.Root | null = null
let menuRoot: ReactDOM.Root | null = null
let currentText: string | null = null
let lastPosition = { x: 0, y: 0 }
let isMenuHovered = false
let isSidebarHovered = false
let hoverTimer: NodeJS.Timeout | null = null
const HOVER_DELAY = 300

// Initializes the extension by rendering the sidebar and setting up event listeners
const initializeExtension = () => {
  if (!isExtensionEnabled) return
  const sidebarContainer = document.createElement('div')
  document.body.appendChild(sidebarContainer)
  sidebarRoot = ReactDOM.createRoot(sidebarContainer)
  renderSidebar()
  setupEventListeners()
}

// Renders the sidebar component
const renderSidebar = () => {
  if (!sidebarRoot) return
  sidebarRoot.render(
    <Sidebar
      isCollapsed={isSidebarCollapsed}
      onToggle={toggleSidebar}
      content={geminiResponseText}
    />
  )
}

// Displays the context menu at the cursor's position with the selected text
const showContextMenu = (x: number, y: number, text: string) => {
  if (isSidebarHovered) return

  if (currentText === text) return
  currentText = text
  isMenuHovered = false

  // If the context menu is already rendered, just update it
  if (menuRoot) {
    menuRoot.render(
      <ContextMenu
        position={{ x, y }}
        selectedText={text}
        onAction1={sendRequest}
        onAction2={saveNote}
        onClose={() => {
          isMenuHovered = false
          if (menuRoot) {
            menuRoot.unmount()
            menuRoot = null
            currentText = null
          }
        }}
      />
    )
    return
  }

  // Create a new menu if it doesn't exist yet
  const menuContainer = document.createElement('div')
  menuContainer.id = 'text-hover-context-menu'
  document.body.appendChild(menuContainer)
  menuRoot = ReactDOM.createRoot(menuContainer)

  menuRoot.render(
    <ContextMenu
      position={{ x, y }}
      selectedText={text}
      onAction1={sendRequest}
      onAction2={saveNote}
      onClose={() => {
        isMenuHovered = false
        if (menuRoot) {
          menuRoot.unmount()
          menuRoot = null
          currentText = null
        }
      }}
    />
  )
}

// Gets the text content under the cursor, excluding elements like the sidebar
const getTextContentUnderCursor = (element: Element | null): string | null => {
  if (!element) return null

  // Exclude text inside the sidebar and toggle button
  if (
    element.closest('.extension-sidebar') ||
    element.closest('.extension-sidebar-toggle')
  ) {
    return null
  }

  // Handle text node and elements like headings or paragraphs
  if (element.nodeType === Node.TEXT_NODE) {
    return element.nodeValue?.trim() || null
  }

  if (
    element.childNodes.length === 1 &&
    element.firstChild?.nodeType === Node.TEXT_NODE
  ) {
    return element.textContent?.trim() || null
  }

  if (
    ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN'].includes(element.nodeName)
  ) {
    return element.textContent?.trim() || null
  }

  return null
}

// Cleans up the extension, removing sidebar, context menu, and resetting state
const cleanupExtension = () => {
  document
    .querySelectorAll(
      '[id^="text-hover-"], .extension-sidebar, .extension-sidebar-toggle'
    )
    .forEach((el) => {
      el.remove()
    })

  // Reset states for hovering and text tracking
  isMenuHovered = false
  isSidebarHovered = false
  currentText = null
  lastPosition = { x: 0, y: 0 }

  // Clear hover timer if it exists
  if (hoverTimer) {
    clearTimeout(hoverTimer)
    hoverTimer = null
  }

  // Unmount React components
  if (menuRoot) {
    menuRoot.unmount()
    menuRoot = null
  }
  if (sidebarRoot) {
    sidebarRoot.unmount()
    sidebarRoot = null
  }
}

// Set up event listeners for mouse movements, hover actions, etc.
const setupEventListeners = () => {
  let lastHoveredElement: Element | null = null

  // Track mouse position on movement
  document.addEventListener('mousemove', (e) => {
    if (!isExtensionEnabled) return
    lastPosition = { x: e.clientX, y: e.clientY }
  })

  // Trigger context menu on hover over text
  document.addEventListener('mouseover', (e) => {
    if (!isExtensionEnabled) return
    const target = e.target as Element

    if (isSidebarHovered || isMenuHovered || target === lastHoveredElement) {
      return
    }

    lastHoveredElement = target

    if (hoverTimer) {
      clearTimeout(hoverTimer)
      hoverTimer = null
    }

    const text = getTextContentUnderCursor(target)

    if (text) {
      hoverTimer = setTimeout(() => {
        if (!isMenuHovered && !isSidebarHovered && isExtensionEnabled) {
          showContextMenu(lastPosition.x, lastPosition.y, text)
        }
      }, HOVER_DELAY)
    }
  })

  // Close context menu when clicking outside
  document.addEventListener('mousedown', (e) => {
    if (!isExtensionEnabled) return
    const target = e.target as Element

    if (menuRoot && !target.closest('#text-hover-context-menu')) {
      isMenuHovered = false
      if (menuRoot) {
        menuRoot.unmount()
        menuRoot = null
        currentText = null
      }
    }

    if (hoverTimer) {
      clearTimeout(hoverTimer)
      hoverTimer = null
    }
  })

  // Track hovering over sidebar or context menu
  document.body.addEventListener(
    'mouseenter',
    (e) => {
      const target = e.target as Element

      if (target.closest('#text-hover-context-menu')) {
        isMenuHovered = true
        if (hoverTimer) {
          clearTimeout(hoverTimer)
          hoverTimer = null
        }
      }

      if (
        target.closest('.extension-sidebar') ||
        target.closest('.extension-sidebar-toggle')
      ) {
        isSidebarHovered = true
        if (hoverTimer) {
          clearTimeout(hoverTimer)
          hoverTimer = null
        }
      }
    },
    true
  )

  // Track mouse leaving the sidebar or context menu
  document.body.addEventListener(
    'mouseleave',
    (e) => {
      const target = e.target as Element

      if (target.closest('#text-hover-context-menu')) {
        isMenuHovered = false
      }

      if (
        target.closest('.extension-sidebar') ||
        target.closest('.extension-sidebar-toggle')
      ) {
        isSidebarHovered = false
      }
    },
    true
  )

  // Clear hover timer on scroll
  window.addEventListener('scroll', () => {
    if (!isExtensionEnabled) return
    if (hoverTimer) {
      clearTimeout(hoverTimer)
      hoverTimer = null
    }
  })
}

// Toggle the sidebar's collapsed state
const toggleSidebar = () => {
  if (!isExtensionEnabled) return
  isSidebarCollapsed = !isSidebarCollapsed
  chrome.runtime.sendMessage({ type: 'SIDEBAR_TOGGLED' })
  renderSidebar()
}

// Send a request to fetch content based on selected text
const sendRequest = async (text: string) => {
  if (!isExtensionEnabled) return
  try {
    const response = await fetch(
      `${import.meta.env.VITE_GEMINI_URL}?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `What does it mean: ${text}`,
                },
              ],
            },
          ],
        }),
      }
    )

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }

    const data = await response.json()
    geminiResponseText =
      data.candidates[0]?.content?.parts[0]?.text || 'No response'
    isSidebarCollapsed = false
    renderSidebar()
  } catch (error) {
    geminiResponseText = `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
    isSidebarCollapsed = false
    renderSidebar()
  }
}

// Save the selected text as a note
const saveNote = (text: string) => {
  if (!isExtensionEnabled) return
  chrome.runtime.sendMessage({ type: 'SAVE_NOTE', text }, (response) => {
    alert('Note saved successfully!')
    if (!response?.success) {
      console.error('Failed to save note')
    }
  })
}

// Initialize extension
initializeExtension()

// Listen for messages to toggle extension or sidebar
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'TOGGLE_EXTENSION') {
    isExtensionEnabled = message.enabled
    if (!isExtensionEnabled) {
      cleanupExtension()
    } else {
      initializeExtension()
    }
    sendResponse({ success: true })
  } else if (message.type === 'TOGGLE_SIDEBAR') {
    toggleSidebar()
  }
})

// Initialize extension based on its state
if (isExtensionEnabled) {
  initializeExtension()
} else {
  cleanupExtension()
}
