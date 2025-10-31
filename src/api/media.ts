import AXIOS from "@/lib/axios";
import URLS from "@/config";

const deleteAMedia = async (public_id: string ) => {
  if (!public_id) return false;
  try {
    const res = await AXIOS.delete(URLS.MEDIA.DELETE_MEDIA(public_id));
    return res.data;
  } catch (err: any) {
    return {
      error: err?.error || err.message || "Failed to delete media",
    };
  }
};

const upload_img = async (public_id: string ) => {
  if (!public_id) return false;
  try {
    const res = await AXIOS.delete(URLS.MEDIA.DELETE_MEDIA(public_id));
    return res.data;
  } catch (err: any) {
    return {
      error: err?.error || err.message || "Failed to delete media",
    };
  }
};

const media = { deleteAMedia,upload_img };
export default media;
