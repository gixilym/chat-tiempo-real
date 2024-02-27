import { useMyContext } from "../utils.js";
import SendBtn from "./SendBtn.jsx";

function Footer() {
  const { message, setMessage, socket, userName } = useMyContext();

  let lastValue = null;
  let timer;

  function handleSubmit(event) {
    event.preventDefault();

    if (!userName) {
      setChooseName(true);
      return;
    }

    if (!message) return;

    const newMessage = {
      message,
      userName,
    };

    setMessage("");
    socket.emit("stop_writing");
    socket.emit("message", newMessage);
  }

  function handleChange(e) {
    const newValue = e.target.value;
    setMessage(e.target.value);
    console.log("escribiendo..");
    socket.emit("writing", `${userName} is writing`);

    if (newValue != lastValue) {
      lastValue = newValue;
      clearTimeout(timer);

      timer = setTimeout(() => {
        if (e.target.value == lastValue) {
          console.log("PARASTE");
          return socket.emit("stop_writing");
        }
      }, 1000);
    }
  }

  return (
    <footer className="p-4 bg-gray-200 border-b-2 rounded-b-md border-gray-400 w-full flex flex-col justify-between items-center gap-y-2">
      <form
        onSubmit={handleSubmit}
        className="flex items-center space-x-2 w-full"
      >
        <input
          value={message}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-400 placeholder:text-gray-600 outline-0"
          placeholder="Type your message here..."
        />
        <SendBtn onClick={handleSubmit} />
      </form>

      <small className="text-xs text-gray-600 text-pretty">
        We respect your privacy and do not collect or store any personal data.
      </small>
    </footer>
  );
}

export default Footer;
