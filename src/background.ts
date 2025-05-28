import { db } from './firebase'
import { collection, addDoc } from 'firebase/firestore'

chrome.action.onClicked.addListener((tab) => {
  if (tab.id) {
    chrome.tabs.sendMessage(tab.id, { type: 'TOGGLE_SIDEBAR' })
  }
})

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'SAVE_NOTE') {
    saveToFirestore(message.text)
      .then(() => sendResponse({ success: true }))
      .catch(() => sendResponse({ success: false }))
    return true
  }
  sendResponse({ success: true })
})

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
