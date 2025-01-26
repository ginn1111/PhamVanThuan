import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./src/App";
import "./style.css";
import { Toaster } from "./src/components/ui/sonner";
import ReactQueryProvider from "./src/providers/ReactQuery";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQueryProvider>
      <App />
    </ReactQueryProvider>
    <Toaster />
  </StrictMode>,
);
