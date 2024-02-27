import { createRoot } from "react-dom/client";
import { MyContext } from "./src/MyContext.jsx";
import App from "./src/App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <MyContext>
    <App />
  </MyContext>
);
