import { useContext } from "react";
import { Context } from "./MyContext.jsx";

function useMyContext() {
  const context = useContext(Context);
  return context;
}

export { useMyContext };
