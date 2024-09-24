import axios from "axios";

export function handleGetToken() {
  return sessionStorage.getItem("JWT");
}

export function handleSetToken(token: string) {
  sessionStorage.setItem("JWT", token);
  axios.interceptors.request.use((request) => {
    request.headers.Authorization = `Bearer ${token}`;
    return request;
  });
}
