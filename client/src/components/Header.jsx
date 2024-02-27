import OnlineUsers from "./OnlineUsers.jsx";

function Header() {
  return (
    <header className="flex flex-row items-start justify-between gap-x-2 font-semibold text-md absolute top-0 backdrop-blur-md w-full h-12">
      <OnlineUsers />
    </header>
  );
}

export default Header;
