const SERVER_URL = "http://localhost:5555";
const USER_KEY = "uck"

// Base API
const API_BASE = "api";

// User endpoints
const USER_BASE = `${SERVER_URL}/${API_BASE}/user`;

const URLS = {
  LOCAL_STORE:{SET_USER:USER_KEY},
  SERVER_URL,

  USER: {
    GET_USERS: `${USER_BASE}/get_users`,
    GET_MY_PROFILE: `${USER_BASE}/me`,
    GET_EXIST_USER: (number: string | number) =>
      `${USER_BASE}/exist_user/${number}`,
    CREATE_USER: `${USER_BASE}/create_user`,
    GET_USER: (user_id: string | number) => `${USER_BASE}/get_user/${user_id}`,
  },
};

export default URLS;
