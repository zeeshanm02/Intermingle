// src/main.tsx
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App" // ← no .tsx
import { ConfirmProvider } from "./components/ui/ConfirmProvider" // ← no .tsx

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfirmProvider>
      <App />
    </ConfirmProvider>
  </StrictMode>
)
