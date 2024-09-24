import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import UserProvider from "./context/UserProvider.tsx";
import "./global/axiosConfig.ts";
import "./index.css";

// TODO - need to implement axios interceptor to contain the jwt token automatically
// axios.interceptors.request.use((request) => {
//   request.headers.Authorization =
//   return request;
// });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </StrictMode>
);
