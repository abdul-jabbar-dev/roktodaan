import URLS from "@/config";

const deleteAMedia = async (public_id: string) => {
  const res = await fetch(URLS.MEDIA.DELETE_MEDIA(public_id), {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
};

const media = { deleteAMedia };
export default media;
