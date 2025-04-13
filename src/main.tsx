import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import BlogList from "./component/BlogList.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <BlogList />
  </StrictMode>
);
