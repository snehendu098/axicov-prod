import { useState, useEffect } from "react";

// Define the store interface
interface MessageStore {
  intermediateMessage: string;
  setIntermediateMessage: (message: string) => void;
  subscribe: (callback: () => void) => () => void;
}

// Create a simple store implementation outside of React components
const createMessageStore = (): MessageStore => {
  // Current message state
  let message = "";

  // Set of subscribers
  const subscribers = new Set<() => void>();

  // Method to update the message
  const setIntermediateMessage = (newMessage: string) => {
    message = newMessage;
    // Notify all subscribers
    subscribers.forEach((callback) => callback());
  };

  // Method to get current message
  const getIntermediateMessage = (): string => {
    return message;
  };

  // Method to subscribe to changes
  const subscribe = (callback: () => void) => {
    subscribers.add(callback);

    // Return unsubscribe function
    return () => {
      subscribers.delete(callback);
    };
  };

  return {
    get intermediateMessage() {
      return getIntermediateMessage();
    },
    setIntermediateMessage,
    subscribe,
  };
};

// Create a singleton instance
export const messageStore = createMessageStore();

// Hook to use the message store in React components
export const useMessageStore = () => {
  // Local state to trigger re-renders
  const [message, setMessage] = useState(messageStore.intermediateMessage);

  useEffect(() => {
    // Subscribe to store changes
    const unsubscribe = messageStore.subscribe(() => {
      setMessage(messageStore.intermediateMessage);
    });

    // Cleanup subscription
    return unsubscribe;
  }, []);

  return {
    intermediateMessage: message,
    setIntermediateMessage: messageStore.setIntermediateMessage,
  };
};

// Example of a non-component function that uses the store
export const updateMessageFromAnywhere = (newMessage: string) => {
  messageStore.setIntermediateMessage(newMessage);
};

// Example of a non-component function that reads from the store
export const getCurrentMessage = (): string => {
  return messageStore.intermediateMessage;
};
