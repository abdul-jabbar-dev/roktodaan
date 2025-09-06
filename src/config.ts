const SERVER_URL = "http://localhost:5555";

// Base API
const API_BASE = "api";

// User endpoints
const USER_BASE = `${SERVER_URL}/${API_BASE}/user`;

const URLS = {
  SERVER_URL,

  USER: {
    GET_USERS: `${USER_BASE}/get_users`,
    GET_EXIST_USER: (number: string | number) =>
      `${USER_BASE}/exist_user/${number}`,
    CREATE_USER: `${USER_BASE}/create_user`,
    GET_USER: (user_id: string | number) => `${USER_BASE}/get_user/${user_id}`,
  },
};

export default URLS;
