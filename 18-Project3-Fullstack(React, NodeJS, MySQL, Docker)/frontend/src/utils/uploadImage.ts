import moment from "moment";
import { makeRequest } from "./makeRequest";

export const uploadImage = async (image: File) => {
  try {
    const formData = new FormData();
    if (image) formData.append("image", image);
    const res = await makeRequest().post(
      `/api/images/upload/${image.name}-${moment().format(
        "YYYY-MM-DD_HH:mm:ss"
      )}`,
      formData
    );
    return res;
  } catch (error) {
    console.error(error);
  }
};
