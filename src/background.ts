import { db } from './firebase'
import { collection, addDoc } from 'firebase/firestore'

// Listen for the extension's icon being clicked by the user
chrome.action.onClicked.addListener((tab) => {
  if (tab.id) {
    chrome.tabs.sendMessage(tab.id, { type: 'TOGGLE_SIDEBAR' })
  }
})

// Listen for incoming messages in the background script
// If the message type is 'SAVE_NOTE', trigger the saveToFirestore function
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'SAVE_NOTE') {
    saveToFirestore(message.text)
      .then(() => sendResponse({ success: true }))
      .catch(() => sendResponse({ success: false }))
    return true
  }
  sendResponse({ success: true })
})

// Function to save the note to Firestore
const saveToFirestore = async (text: string) => {
  try {
    await addDoc(collection(db, 'notes'), {
      text,
      timestamp: new Date(),
    })
    alert('Note saved successfully!')
  } catch (error) {
    console.error('Error saving to Firestore:', error)
  }
}

// Listen for when a tab is updated
chrome.tabs.onUpdated.addListener(async (tabId) => {
  const { extensionEnabled } = await chrome.storage.sync.get('extensionEnabled')
  chrome.tabs.sendMessage(tabId, {
    type: 'TOGGLE_EXTENSION',
    enabled: extensionEnabled ?? true,
  })
})

// Listen for when a new tab is created
chrome.tabs.onCreated.addListener(async (tab) => {
  const { extensionEnabled } = await chrome.storage.sync.get('extensionEnabled')
  if (tab.id) {
    chrome.tabs.sendMessage(tab.id, {
      type: 'TOGGLE_EXTENSION',
      enabled: extensionEnabled ?? true,
    })
  }
})

// Listen for changes to the extension's storage (enabling/disabling)
chrome.storage.onChanged.addListener(async (changes, area) => {
  if (area === 'sync' && 'extensionEnabled' in changes) {
    const enabled = changes.extensionEnabled.newValue
    const tabs = await chrome.tabs.query({})
    tabs.forEach((tab) => {
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, {
          type: 'TOGGLE_EXTENSION',
          enabled,
        })
      }
    })
  }
})
