// src/services/firebase.js
import { collection, addDoc, query, getDocs, serverTimestamp, orderBy, limit, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const CHAT_COLLECTION = "chatHistory";

export const saveMessage = async (message, userType, figure) => {
  try {
    await addDoc(collection(db, CHAT_COLLECTION), {
      message,
      userType,
      figure,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.error('Error saving message:', error);
  }
};

export const fetchChatHistory = async (selectedFigure, limitCount = 50) => {
  try {
    const q = query(
      collection(db, CHAT_COLLECTION),
      where('figure', '==', selectedFigure),
      orderBy('timestamp', 'asc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate()
    }));
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return [];
  }
};
