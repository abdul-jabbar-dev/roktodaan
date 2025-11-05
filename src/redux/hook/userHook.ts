import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import URLS from "@/config";
import { UserState } from "../slice/userSlice";
import { setUserDataFetch } from "@/redux/slice/userSlice";
import API from "@/api";
import { getItemFromStore } from "@/utils/store/localstore";

export function useUser() {
  const dispatch = useDispatch(); 
  const oldData = useSelector(({ user }: { user: UserState }) => user);

  useEffect(() => {
    const tokenStr = getItemFromStore()
    if (!tokenStr) { 
      return;
    }
    
    const token = JSON.parse(tokenStr)?.token;
    console.log("token:", token);
    if (!token) { 
      return;
    }

    // যদি user data না থাকে Redux এ
    if (!oldData?.credential?.id) {
      (async () => {
        try {
          const res = await API.user.getMyInfo(token);

          // API return format { error?, ...data }
          if (res.error) {
            console.error("Failed to load user profile:", res.error);
 
          } else if (!res || !res.credential?.id) {
            console.error("User data invalid or missing:", res); 
          } else {
            // Successfully fetched
            dispatch(setUserDataFetch(res.data));
          }
        } catch (err) {
          console.error("Failed to fetch user:", err); // network বা unexpected error → redirect
        }
      })();
    }
  }, [dispatch, oldData?.credential?.id]);

  return null;
}
