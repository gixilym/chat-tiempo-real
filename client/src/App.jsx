import { useEffect } from "react";
import { useMyContext } from "./utils.js";
import Main from "./components/Main.jsx";
import Header from "./components/Header.jsx";
import ChatMessages from "./components/ChatMessages.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const {
    socket,
    allMessages,
    setAllMessages,
    setOnlineUsers,
    setUserWriting,
  } = useMyContext();

  useEffect(() => {
    socket.on("message", newMessage => receiveMessage(newMessage));

    socket.on("online_user", newOnlineUser =>
      setOnlineUsers(prevState => [...prevState, newOnlineUser])
    );

    socket.on("writing", userWriting => setUserWriting(userWriting));

    socket.on("stop_writing", stop => setUserWriting(stop));

    socket.on("error", err => console.error(err.message));

    return () => socket.off();
  }, []);

  useEffect(() => {
    const list = document.body.querySelector("#list");
    return () => (list.scrollTop = list.scrollHeight);
  }, [allMessages]);

  function receiveMessage(newMessage) {
    return setAllMessages(prevState => [...prevState, newMessage]);
  }

  return (
    <Main>
      <Header />
      <ChatMessages />
      <Footer />
    </Main>
  );
}
export default App;

//TODO: detectar cuando un usuario cierra la web y actualizar usuarios en línea.
