# Historical Figure Simulator 🕰️🤖

## Introduction

Learning history can be dull and disconnected. Imagine having a conversation with Thomas Edison about innovation, discussing philosophy with Krishna, or seeking writing advice from William Shakespeare. With our *Historical Figure Simulator*, powered by Gemini AI and Google Cloud, we've made this vision a reality.

## Design

The design of the Historical Figure Simulator is centered around an engaging and interactive user experience. The architecture includes:

1. **Frontend**: Built with React.js, offering a seamless, intuitive interface
2. **Backend**: Powered by Firebase for real-time data handling and scalability
3. **Database**: Firestore, a flexible and scalable NoSQL cloud database, manages user interactions and historical content efficiently
4. **AI Engine**: Gemini AI drives the natural language processing, ensuring historical accuracy and contextually rich conversations
5. **Cloud Services**: Google Cloud supports deployment and scaling, ensuring reliable performance

### Key Design Considerations

- **Accuracy**: Each figure's responses are crafted to reflect their historical context and personality
- **Scalability**: The use of Firestore and Google Cloud ensures smooth performance for concurrent users
- **Interactivity**: An emphasis on dynamic and engaging conversational flows

## Prerequisites

### Tools & Software

* Node.js and npm
* Firebase account with Firestore enabled
* Gemini AI API
* Google Cloud
* React + Vite

### Concepts to Know

* React (components, props, hooks)
* Firestore CRUD operations
* How to use APIs (GET/POST requests)

## Project Setup

### Step 1: Set Up Firebase

* Create a Firebase project in the Firebase Console
* Enable Firestore in your project
* Create a collection called `figures` to store historical data
* Enable hosting for deployment
* Add Firebase config to your React project

#### Sample Firestore Data Structure

```json
{
  "name": "Albert Einstein",
  "field": "Physics",
  "personality": "Curious, witty",
  "quirks": "Messy hair, no socks",
  "humorTopics": ["Relativity", "Physics humor"]
}
```

### Step 2: Obtaining Gemini API Key

* Select your Google Cloud project or create a new one from Google Vertex AI Studio
* Enable Vertex AI API Key
* Create an API key, copy the key and store it securely

### Step 3: Initialize Your React App

#### Create React App

```bash
npx create-react-app historical-figure-chat
```

#### Install Required Libraries

```bash
npm install firebase axios tailwindcss
```

### Sample Chat Interface Code

```jsx
import React, { useState } from "react";
import axios from "axios";

const ChatApp = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    const userMessage = { sender: "User", text: input };
    setMessages([...messages, userMessage]);

    const response = await axios.post("https://gemini-api-endpoint", {
      query: input,
    });
    const aiMessage = { sender: "AI", text: response.data.reply };
    setMessages([...messages, userMessage, aiMessage]);
    setInput("");
  };

  return (
    <div>
      <div>
        {messages.map((msg, idx) => (
          <p key={idx}>
            <strong>{msg.sender}:</strong> {msg.text}
          </p>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatApp;
```

### Firestore Integration

```javascript
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

const saveMessage = async (message) => {
  await addDoc(collection(db, "messages"), message);
};
```

### Deployment

```bash
firebase init
firebase deploy
```

## Result

User interfaces showcasing:
- Chat with Lord Krishna trained on Mahabharat
- Chat with Albert Einstein

## What's Next ?

* Make multiple figures talk with each other
* Enhance with sentiment analysis to adjust AI responses dynamically
* Integrate voice-to-text and text-to-voice for accessibility

## Getting Started

To learn more about Google Cloud services and create impact:
* Register for Code Vipassana sessions
* Join the Datapreneur Social meetup group
* Sign up to become a Google Cloud Innovator

