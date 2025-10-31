import axios from "axios";

// ✅ Axios global instance
const AXIOS = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// suppress network error logs
AXIOS.interceptors.response.use(
  (response) => response,
  (error) => {
    // শুধু network error swallow করো
    if (error.response) {
      return Promise.resolve({
        error: error.response.data?.error || "Request failed",
      });
    }
    return Promise.resolve({ error: "Network error" });
  }
);

export default AXIOS;
