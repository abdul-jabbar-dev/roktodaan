import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import URLS from "@/config";
import { UserState } from "../slice/userSlice";
import { setUserDataFetch } from "@/redux/slice/userSlice";

export function useUser() {
  const dispatch = useDispatch();
  const oldData = useSelector(({ user }: { user: UserState }) => user);
  useEffect(() => {
    const tokenStr = localStorage.getItem(URLS.LOCAL_STORE.SET_USER);
    const token = tokenStr ? JSON.parse(tokenStr)?.token : null;

    if (token && !oldData.id) {
      (async () => {
        try {
          const res = await fetch(URLS.USER.GET_MY_PROFILE, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          dispatch(setUserDataFetch(data.data));
          // {note} if data.data nathake or error pawa jay tahile login pathate hobe
        } catch (err) {
          console.error("Failed to fetch user:", err);
        }
      })();
    }
  }, [dispatch, oldData.id]);

  return null;
}
