import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import URLS from "@/config";
import { UserState } from "../slice/userSlice";
import { setUserDataFetch } from "@/redux/slice/userSlice";
import API from "@/api";

export function useUser() {

  const dispatch = useDispatch();
  const oldData = useSelector(({ user }: { user: UserState }) => user);
  
  useEffect(() => {
    const tokenStr = localStorage.getItem(URLS.LOCAL_STORE.SET_USER);
 
    const token = tokenStr ? JSON?.parse(tokenStr)?.token : null;

    if (token && !oldData.id) {
      (async () => {
        try {
          const data = await API.user.getMyInfo(token);

          if (data) {
            dispatch(setUserDataFetch(data.data));
          } else {
            console.log("Failed to load user profile");
          }
          // {note} if data.data nathake or error pawa jay tahile login pathate hobe
        } catch (err) {
          console.error("Failed to fetch user:", err);
        }
      })();
    }
    
  }, [dispatch, oldData.id]);

  return null;
}
