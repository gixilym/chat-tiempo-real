import { useMyContext } from "../utils.js";

function OnlineUsers() {
  const { onlineUsers } = useMyContext();

  return (
    <section className="w-2/6 h-auto flex flex-col items-start justify-center px-4 py-3 rounded-br-md bg-emerald-900 hover:bg-green z-10 overflow-hidden">
      <details className="w-full">
        <summary className="font-medium text-green-200">
          En línea: {onlineUsers?.length}
        </summary>
        <ul className="flex flex-col items-start justify-center">
          {onlineUsers?.map(user => (
            <li key={user} className="font-semibold text-green-100 ml-1">
              {user}
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}

export default OnlineUsers;

function UserIcon() {
  return (
    <svg
      className="h-6 w-6 mr-2 text-green-500 dark:text-green-200"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
