import AXIOS from "@/lib/axios";
import URLS from "@/config"; 

const allRequests = async () => {
  try {
    const res = await AXIOS.get(URLS.REQUEST.ALL_REQUESTS);
    return res;
  } catch (err: any) {
    return {
      error: err?.error || err.message || "Failed to fetch request data",
    };
  }
};

const request = { allRequests };
export default request;
