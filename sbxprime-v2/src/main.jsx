import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

/* Progressive enhancement flag: scroll animations only run when JS is live.
 Without this class, all .fx content renders fully visible (no blank sections). */
document.documentElement.classList.add("js");

ReactDOM.createRoot(document.getElementById("root")).render(
 <React.StrictMode>
 <App />
 </React.StrictMode>
);
