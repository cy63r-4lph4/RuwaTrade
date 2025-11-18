import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <>
    <AuthProvider>
      <App />
    </AuthProvider>
    <Toaster position="top-center" reverseOrder={false} />
  </>
);
