import { createContext, useState } from "react";
import io from "socket.io-client";

const socket = io("https://chat-real-time-nsix.onrender.com");
const Context = createContext(null);

function MyContext({ children }) {
  const [message, setMessage] = useState(""),
    [allMessages, setAllMessages] = useState([]),
    [userName, setUserName] = useState(""),
    [chooseName, setChooseName] = useState(true),
    [onlineUsers, setOnlineUsers] = useState([]),
    [userWriting, setUserWriting] = useState("");

  const values = {
    socket,
    message,
    setMessage,
    allMessages,
    setAllMessages,
    userName,
    setUserName,
    chooseName,
    setChooseName,
    onlineUsers,
    setOnlineUsers,
    userWriting,
    setUserWriting,
  };

  return <Context.Provider value={values}>{children}</Context.Provider>;
}

export { Context, MyContext };
