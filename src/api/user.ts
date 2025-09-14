import axios from "axios";
import URLS from "@/config";
import UserUpdateInput from "@/types/user/user";
import { Location } from "@/types/location/destination";

// get user info
const getMyInfo = async (token: string) => {
  try {
    const res = await axios.get(URLS.USER.GET_MY_PROFILE, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err: any) {
    console.error("getMyInfo error:", err);
    throw new Error(
      err?.response?.data?.message || "Failed to fetch user info"
    );
  }
};

// update password
const updatePassword = async (password: string) => {
  try {
    const tokenStr = localStorage.getItem(URLS.LOCAL_STORE.SET_USER);
    const token = tokenStr ? JSON.parse(tokenStr)?.token : null;

    if (!token) throw new Error("No token found");
    const res = await axios.put(
      URLS.USER.UPDATE_PASSWORD,
      { password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (err: any) {
    console.error("updatePassword error:", err);
    throw new Error(
      err?.response?.data?.message || "Failed to update password"
    );
  }
};

const updateuser = async (userData: UserUpdateInput) => {
  try {
    const tokenStr = localStorage.getItem(URLS.LOCAL_STORE.SET_USER);
    const token = tokenStr ? JSON.parse(tokenStr)?.token : null;

    if (!token) throw new Error("No token found");
    const res = await axios.put(
      URLS.USER.UPDATE_USER,
      { ...userData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (err: any) {
    console.error("Update Profile error:", err);
    throw new Error(err?.response?.data?.message || "Failed to update Profile");
  }
};

const updateLocation = async (locationData: Location) => {
  try {
    const tokenStr = localStorage.getItem(URLS.LOCAL_STORE.SET_USER);
    const token = tokenStr ? JSON.parse(tokenStr)?.token : null;

    if (!token) throw new Error("No token found");
    const res = await axios.put(
      URLS.USER.UPDATE_ADDRESS,
      { ...locationData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (err: any) {
    throw new Error(err?.response?.data?.message || "Failed to update Profile");
  }
};

const getUsers = async () => {
  try {
    const res = await axios.get(URLS.USER.GET_USERS);
    return res.data;
  } catch (err: any) {
    throw new Error(err?.response?.data?.message || "Failed to Users Profile");
  }
};

const updateExperiance = async (experiance: {
  lastDonationDate: string;
  lastDonationLocation: string;
  id?: string | number;
}) => {
  try {
    const tokenStr = localStorage.getItem(URLS.LOCAL_STORE.SET_USER);
    const token = tokenStr ? JSON.parse(tokenStr)?.token : null;

    if (!token) throw new Error("No token found");
    const res = await axios.put(
      URLS.USER.UPDATE_EXPERIANCE,
      { ...experiance },

      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (err: any) {
    throw new Error(err?.response?.data?.message || "Failed to Users Profile");
  }
};

const user = {
  getMyInfo,
  updatePassword,
  updateuser,
  updateLocation,
  getUsers,
  updateExperiance,
};
export default user;
