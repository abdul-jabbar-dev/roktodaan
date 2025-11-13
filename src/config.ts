const SITE_URL = process.env.SITE_URL || "http://localhost:link";
const SERVER_URL = process.env.SERVER_URL || "http://localhost:5555";
// const SERVER_URL = 'https://roktodaan-express.onrender.com';
const USER_KEY = "uck";
const GOOGLE_API_KEY =
  process.env.GOOGLE_API_KEY || "AIzaSyCE60_SOCNW9eiIlRpYYfEweP9A663Vwmw";
// Base API
const API_BASE = "api";

// User endpoints
const USER_BASE = `${SERVER_URL}/${API_BASE}/user`;
const MEDIA_BASE = `${SERVER_URL}/${API_BASE}/media`;
const REQUEST_BASE = `${SERVER_URL}/${API_BASE}/request`;

const URLS = {
  GOOGLE_API_KEY,

  LOCAL_STORE: { SET_USER: USER_KEY },
  SITE_URL,
  SERVER_URL,
  CLOUDINARY_URL:
    process.env.CLOUDINARY_URL ||
    "https://api.cloudinary.com/v1_1/dnkwv76h3/upload",
  MEDIA: {
    DELETE_MEDIA: (public_id: string) =>
      `${MEDIA_BASE}/delete/?public_id=${public_id}`,
    UPDATE_USER_IMG: (link: string) =>
      `${MEDIA_BASE}/update_profile_img/?link=${link}`,
    UPLOAD_IMG: `${MEDIA_BASE}/upload_img`,
  },
  REQUEST: {
    BASE: REQUEST_BASE,
    PUBLISH_REQUEST: `${REQUEST_BASE}/publish`,
    ALL_REQUESTS: `${REQUEST_BASE}/get_requests`,
    UPCOMMING_REQUESTS:(user_id:string)=> `${REQUEST_BASE}/request/${user_id}`,
  },
  USER: {
    FORGET_PASSWORD: `${USER_BASE}/forget_password`,
    GET_USERS: `${USER_BASE}/get_users`,
    GET_POPULAR_USERS: `${USER_BASE}/get_popular_users`,
    GET_MY_PROFILE: `${USER_BASE}/me`,
    GET_EXIST_USER: (email: string) => `${USER_BASE}/exist_user/${email}`,
    CREATE_USER: `${USER_BASE}/create_user`,
    GET_USER: (user_id: string | number) => `${USER_BASE}/get_user/${user_id}`,
    UPDATE_PASSWORD: `${USER_BASE}/update_password`,
    NEW_PASSWORD_WITH_OTP: `${USER_BASE}/new_password_with_otp`,
    UPDATE_USER: `${USER_BASE}/update_profile`,

    UPDATE_ADDRESS: `${USER_BASE}/update_address`,
    UPDATE_EXPERIANCE: `${USER_BASE}/update_experiance`,
    NEW_OTP: `${USER_BASE}/email_verify_send_otp`,
    VARIFY_OTP: `${USER_BASE}/email_verify_otp`,
    LOGIN: `${USER_BASE}/login`,
    JWT_SESSION: `${USER_BASE}/session-status`,
  },
};

export default URLS;
