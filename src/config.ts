const SERVER_URL = "http://localhost:5555";
const USER_KEY = "uck";

// Base API
const API_BASE = "api";

// User endpoints
const USER_BASE = `${SERVER_URL}/${API_BASE}/user`;
const MEDIA_BASE = `${SERVER_URL}/${API_BASE}/media`;

const URLS = {
  LOCAL_STORE: { SET_USER: USER_KEY },
  SERVER_URL,
  CLOUDINARY_URL: "https://api.cloudinary.com/v1_1/dnkwv76h3/upload",
  MEDIA: {
    DELETE_MEDIA: (public_id: string) =>
      `${MEDIA_BASE}/delete/?public_id=${public_id}`,
  },
  USER: {
    GET_USERS: `${USER_BASE}/get_users`, 
    GET_MY_PROFILE: `${USER_BASE}/me`,
    GET_EXIST_USER: (email: string) => `${USER_BASE}/exist_user/${email}`,
    CREATE_USER: `${USER_BASE}/create_user`,
    GET_USER: (user_id: string | number) => `${USER_BASE}/get_user/${user_id}`,
    UPDATE_PASSWORD: `${USER_BASE}/update_password`,
    UPDATE_USER: `${USER_BASE}/update_profile`,
    UPDATE_ADDRESS: `${USER_BASE}/update_address`,
    UPDATE_EXPERIANCE: `${USER_BASE}/update_experiance`,
    NEW_OTP: `${USER_BASE}/email_verify_send_otp`,
    VARIFY_OTP: `${USER_BASE}/email_verify_otp`,
    LOGIN: `${USER_BASE}/login`,
  },
};

export default URLS;
