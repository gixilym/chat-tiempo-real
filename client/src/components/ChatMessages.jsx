import { useMyContext } from "../utils.js";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

function ChatMessages() {
  const {
    socket,
    chooseName,
    setChooseName,
    userName,
    allMessages,
    setUserName,
    onlineUsers,
    userWriting,
  } = useMyContext();

  function getDate() {
    const now = new Date(),
      hour = now.getHours(),
      minute = now.getMinutes(),
      meridian = now.getHours() >= 12 ? "pm" : "am",
      formattedTime = `${hour < 10 ? "0" + hour : hour}:${
        minute < 10 ? "0" + minute : minute
      }${meridian}`;

    return formattedTime;
  }

  function applyUsername(event) {
    event.preventDefault();
    if (!userName) return;
    if (onlineUsers.includes(userName)) {
      setUserName("");
      alert("El nombre ya está en uso");
      return;
    }

    socket.emit("online_user", userName);
    setChooseName(false);
  }

  function viewChooseName() {
    return (
      <motion.form
        onSubmit={applyUsername}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col justify-center items-start gap-y-2"
      >
        <label htmlFor="username" className="text-white text-3xl mb-6">
          Enter your username
        </label>
        <input
          autoFocus
          value={userName}
          onChange={e => setUserName(e.target.value)}
          minLength={2}
          maxLength={13}
          id="username"
          type="text"
          className="rounded-md w-full text-lg h-10 outline-none pl-4"
          placeholder="Username"
        />

        <button
          type="submit"
          className="bg-green-400 px-8 py-2 text-lg duration-75 font-semibold w-full rounded-lg  hover:bg-green-300"
        >
          Apply
        </button>
      </motion.form>
    );
  }

  function viewChatMessages() {
    return (
      allMessages?.length > 0 &&
      allMessages.map((data, index) =>
        data.userName == "INFO" ? (
          <li
            key={index}
            className="border-2 flex items-center justify-center capitalize font-semibold w-full text-center rounded-lg text-md h-10 text-white"
          >
            <p> {data.message}</p>
          </li>
        ) : (
          <motion.li
            key={index}
            className={twMerge(
              data.userName == userName
                ? "bg-blue-500 self-start border-2 border-blue-300"
                : "bg-slate-600  self-end border-2 border-gray-500",
              "min-w-[250px] max-w-[450px] flex flex-col justify-center items-start rounded-lg px-4 py-1 text-white"
            )}
            initial={{ x: "-100px", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-xl">{data.message}</p>
            <div className="text-gray-300 flex flex-row justify-between items-center w-full text-md">
              <span>{data.userName}</span>
              <time className="tracking-wide">{getDate()}</time>
            </div>
          </motion.li>
        )
      )
    );
  }

  return (
    <ul
      id="list"
      className={twMerge(
        chooseName ? "h-full" : "h-auto",
        "flex flex-col justify-center items-center gap-y-4 w-full px-6 overflow-x-hidden overflow-y-visible pb-6 scroll-smooth font-sans"
      )}
    >
      {chooseName ? viewChooseName() : viewChatMessages()}
      <p className="text-xl text-white">{userWriting && userWriting}</p>
    </ul>
  );
}

export default ChatMessages;
