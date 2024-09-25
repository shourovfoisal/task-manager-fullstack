import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import UserProvider from "./context/UserProvider.tsx";
import "./global/axiosConfig.ts";
import "./index.css";
import store from "./redux/store.ts";

// TODO - need to implement axios interceptor to contain the jwt token automatically
// axios.interceptors.request.use((request) => {
//   request.headers.Authorization =
//   return request;
// });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <UserProvider>
        <App />
      </UserProvider>
    </Provider>
  </StrictMode>
);
