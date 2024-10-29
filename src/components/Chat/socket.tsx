// src/services/socketService.ts
import { io } from "socket.io-client";
import { getUser } from "../../helpers/helper";

const socket = io(`${process.env.REACT_APP_BASEURL}`, {
  transports: ["websocket"],
});

// Function to register the user
export const registerUser = () => {
  socket.emit("register", getUser().id);
};

// Function to listen for messages
export const listenForMessages = (callback: (data: any) => void) => {
  socket.on("chat message", callback);
};

// Function to send a message
export const sendMessage = (messageData: any) => {
  socket.emit("chat message", messageData);
};

// Function to remove user
export const removeUser = () => {
  socket.emit("removeuser");
};

// Function to disconnect socket
export const disconnectSocket = () => {
  socket.disconnect();
};

// Function to remove handler
export const removeHandler = (callback: (data: any) => void) => {
  socket.off("chat message", callback);
};

export default socket; //  in case we want to use the socket instance directly
