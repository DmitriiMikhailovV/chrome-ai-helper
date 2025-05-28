# Chrome Extension - AI Helper

This is a Chrome extension that provides an AI helper for users. It leverages AI to provide text definitions and allows users to save notes. The extension is built using **React**, **TypeScript**, **Vite**, and **Firebase** for storage.

## Features
- **Sidebar**: A collapsible sidebar displaying AI-generated content based on the selected text.
- **Context Menu**: A context menu that appears when hovering over text, offering options like requesting an AI-generated meaning and saving notes.
- **Firebase Integration**: Saved notes are stored in Firebase Firestore.
- **Toggle Extension**: The extension can be toggled on or off via a popup UI.

## Tech Stack
- **React**: Frontend library for building user interfaces.
- **TypeScript**: Adds static types to JavaScript for better development experience.
- **Vite**: Build tool and development server for faster performance.
- **Firebase**: Backend service for saving notes to Firestore.
- **Chrome Extension APIs**: Utilized for background scripts, popup management, and communication between content scripts and other extension parts.

## Setup

### Prerequisites

Before you start, make sure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn (for dependency management)

### Getting Started

1. **Clone the repository:**

   ```bash
   git clone <your-repository-url>
   cd <your-repository-folder>

2. **Install dependencies:**

    ```bash
    npm install

3. **Configure Firebase:**
  You need to set up Firebase in your project. Create a Firebase project in the Firebase Console, then create a .env file at the root of the project and add the following Firebase credentials:

    ```bash
    VITE_FIREBASE_API_KEY=<your-api-key>
    VITE_FIREBASE_AUTH_DOMAIN=<your-auth-domain>
    VITE_FIREBASE_PROJECT_ID=<your-project-id>
    VITE_FIREBASE_STORAGE_BUCKET=<your-storage-bucket>
    VITE_FIREBASE_MESSAGING_SENDER_ID=<your-sender-id>
    VITE_FIREBASE_APP_ID=<your-app-id>

4. **Configure Gemini API:**
  In order to use the AI functionality of the extension, you need to set up the Gemini API keys. Create a .env file at the root of your project (or add these variables to your existing .env file) and add the following Gemini configuration:

    ```bash
    VITE_GEMINI_API_KEY=<your-gemini-api-key>
    VITE_GEMINI_URL=<gemini-api-url>

    *Example gemini url: https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent

5. **Building the Project:**

    ```bash
    npm run build

6. **Install the Extension in Chrome:**

- Go to chrome://extensions/ in your Chrome browser.
- Enable "Developer mode" at the top right.
- Click on "Load unpacked" and select the dist folder from the build output.
- The extension will now be installed, and you can start using it.


## License
This project is licensed under a **Proprietary License**.

You may use, copy, modify, and distribute this software **only with the explicit written permission** of the author. All rights to the software are reserved by the author.

### Terms:
1. **Usage**: You are allowed to use this software only if you have obtained explicit written permission from the author.
2. **Modification**: You may modify this software for personal or internal use, but **you cannot distribute any modified version without prior permission** from the author.
3. **Distribution**: You **cannot redistribute, sublicense, or sell** this software or any modified version of it without explicit permission from the author.
4. **Attribution**: If you are granted permission to use or distribute the software, proper attribution must be given to the author.
5. **No Warranty**: This software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, or noninfringement.
6. **Revocation**: The author reserves the right to revoke permission to use or distribute this software at any time.

For permission requests, commercial use, or further inquiries, please contact [mihaylovdmitriy3@gmail.com].





