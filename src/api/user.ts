import URLS from "@/config";
import UserUpdateInput from "@/types/user/user";
import { Location } from "@/types/location/destination";
import AXIOS from "@/lib/axios";
import { getItemFromStore } from "@/utils/store/localstore";

// get user info
const getMyInfo = async (token: string) => {
  try {
    const res = await AXIOS.get(URLS.USER.GET_MY_PROFILE, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err: any) {
    return { error: err?.response?.data?.error || "Failed to fetch user info" };
  }
};

// update password
const updatePassword = async (password: string) => {
  try {
    const tokenStr = getItemFromStore();
    const token = tokenStr ? JSON.parse(tokenStr)?.token : null;

    if (!token) return { error: "No token found" };

    const res = await AXIOS.put(
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
    return { error: err?.error || "Failed to update password" };
  }
};

// update password
const forgetPasswod = async (email: string) => {
  try {
    const res = await AXIOS.put(
      URLS.USER.FORGET_PASSWORD,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res && "error" in res) throw res;

    return res.data;
  } catch (err: any) {
    return {
      error: err?.response?.data?.error || err?.error || "Failed to send OTP",
    };
  }
};

// get single user
const getUser = async (id: string): Promise<any> => {
  try {
    const res = await fetch(URLS.USER.GET_USER(id), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      return { error: `Failed to fetch user: ${res.statusText}` };
    }

    return res.json();
  } catch (err: any) {
    return { error: "Failed to fetch user" };
  }
};

// update user info
const updateuser = async (userData: UserUpdateInput) => {
  try {
    const tokenStr = getItemFromStore();
    const token = tokenStr ? JSON.parse(tokenStr)?.token : null;

    if (!token) return { error: "No token found" };

    const res = await AXIOS.put(URLS.USER.UPDATE_USER, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (err: any) {
    return { error: err?.response?.data?.error || "Failed to update profile" };
  }
};
// update user Img
const update_profile_img = async (img: string) => {
  try {
    const tokenStr = getItemFromStore();
    const token = tokenStr ? JSON.parse(tokenStr)?.token : null;

    if (!token) return { error: "No token found" };

    const res = await AXIOS.put(
      URLS.MEDIA.UPDATE_USER_IMG(img),
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  } catch (err: any) {
    console.log(err);
    return { error: err?.response?.data?.error || "Failed to update profile" };
  }
}; // change Password
const changePasswordWithOtp = async (userData: {
  otp: string;
  newPassword: string;
}) => {
  try {
    const res = await AXIOS.post(URLS.USER.NEW_PASSWORD_WITH_OTP, userData, {
      withCredentials: true,
    });
    if (res && "error" in res) throw res;

    return res.data;
  } catch (err: any) {
    console.log("userData:", err);
    return {
      error:
        err?.response?.data?.error ||
        err?.error ||
        "OTP গ্রহণ অযোগ্য, পুনরায় চেষ্টা করুন ।",
    };
  }
};

// update location
const updateLocation = async (locationData: Location) => {
  try {
    const tokenStr = getItemFromStore();
    const token = tokenStr ? JSON.parse(tokenStr)?.token : null;

    if (!token) return { error: "No token found" };

    const res = await AXIOS.put(URLS.USER.UPDATE_ADDRESS, locationData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (err: any) {
    return { error: err?.error || "ঠিকানা আপডেট করতে ব্যর্থ হয়েছে" };
  }
};

// get all users (generic it call ssr and client also)
const getUsers = async (tokenOrAccessor?: any | null) => {
  try {
    let tokenStr: string | null = null;

    if (tokenOrAccessor && typeof tokenOrAccessor.get === "function") {
      const tokenData = tokenOrAccessor.get(URLS.LOCAL_STORE.SET_USER)?.value;
      tokenStr = tokenData || null;
    } else if (typeof tokenOrAccessor === "string" || !tokenOrAccessor) {
      tokenStr = getItemFromStore();
    }

    const token = tokenStr ? JSON.parse(tokenStr)?.token : null; 
    const res: any = await AXIOS.get(URLS.USER.GET_USERS, {
      headers: {
        ...(token && {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }),
      },
    });
    if (res?.error) {
      return { error: res?.error || "Failed to fetch users" };
    } else return res.data;
  } catch (err: any) {
    return { error: err?.response?.data?.error || "Failed to fetch users" };
  }
};
// get all users (generic it call ssr and client also)
const getPopularUsers = async (tokenOrAccessor?: any | null) => {
  try {
    let tokenStr: string | null = null;

    if (tokenOrAccessor && typeof tokenOrAccessor.get === "function") {
      const tokenData = tokenOrAccessor.get(URLS.LOCAL_STORE.SET_USER)?.value;
      tokenStr = tokenData || null;
    } else if (typeof tokenOrAccessor === "string" || !tokenOrAccessor) {
      tokenStr = getItemFromStore();
    }

    const token = tokenStr ? JSON.parse(tokenStr)?.token : null; 
    const res: any = await AXIOS.get(URLS.USER.GET_POPULAR_USERS, {
      headers: {
        ...(token && {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }),
      },
    });
    if (res?.error) {
      return { error: res?.error || "Failed to fetch users" };
    } else return res.data;
  } catch (err: any) {
    return { error: err?.response?.data?.error || "Failed to fetch users" };
  }
};

// update donation experience
const updateExperiance = async (experiance: {
  lastDonationDate: string;
  lastDonationLocation: string;
  id?: string | number;
}) => {
  try {
    const tokenStr = getItemFromStore();
    const token = tokenStr ? JSON.parse(tokenStr)?.token : null;

    if (!token) return { error: "No token found" };

    const res = await AXIOS.put(URLS.USER.UPDATE_EXPERIANCE, experiance, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (err: any) {
    return { error: err?.error || "অভিজ্ঞতা যোগ হয়নি " };
  }
};

// generate OTP
const genOTP = async (email: string) => {
  try {
    const tokenStr = getItemFromStore();
    const token = tokenStr ? JSON.parse(tokenStr)?.token : null;

    if (!token) return { error: "No token found" };

    const res = await AXIOS.post(
      URLS.USER.NEW_OTP,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (res && "error" in res) throw res;
    return res.data;
  } catch (err: any) {
    return { error: err?.error || "Failed to generate OTP" };
  }
};

// verify OTP
const varifyOTP = async (
  otp: string,
  { otpType }: { otpType: "emailVerification" | "passwordReset" }
) => {
  try {
    const tokenStr = getItemFromStore();
    const token = tokenStr ? JSON.parse(tokenStr)?.token : null;

    if (!token) return { error: "No token found" };

    const res = await AXIOS.post(
      URLS.USER.VARIFY_OTP,
      { otp },
      {
        params: { otpType },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (res && "error" in res) throw res;
    return res.data;
  } catch (err: any) {
    return { error: err?.error || "Failed to verify OTP" };
  }
};

// login
const login = async (email: string, password: string) => {
  try {
    const res = await AXIOS.post(URLS.USER.LOGIN, { email, password });

    if (res.data.error) {
      throw res.data;
    }
    return res.data;
  } catch (err: any) {
    return { error: err?.error || "Login failed" };
  }
};

// login
const upload_img = async (formData: FormData) => {
  const tokenStr = getItemFromStore();
  const token = tokenStr ? JSON.parse(tokenStr)?.token : null;

  if (!token) return { error: "No token found" };
  try {
    const res = await AXIOS.post(URLS.MEDIA.UPLOAD_IMG, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.error) {
      throw res.data;
    }
    return res.data;
  } catch (err: any) {
    return { error: err?.error || "Login failed" };
  }
};

const sessionStatus = async (sessionName: string) => {
  try {
    const res = await AXIOS.get(URLS.USER.JWT_SESSION, {
      params: { sessionName },
      withCredentials: true, // <--- এটা লাগবে
    });
    return res.data;
  } catch (err: unknown) {
    return {
      error:
        (err as any)?.response?.data?.error ||
        (err as any)?.error ||
        "No Session Found",
    };
  }
};

const user = {
  getPopularUsers,
  getMyInfo,
  updatePassword,
  updateuser,
  updateLocation,
  getUsers,
  updateExperiance,
  genOTP,
  varifyOTP,
  getUser,
  forgetPasswod,
  login,
  changePasswordWithOtp,
  sessionStatus,
  update_profile_img,
  upload_img,
};

export default user;
