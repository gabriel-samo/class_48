import { makeRequest } from "./makeRequest";

export const uploadImage = async (image: File, fileName: string) => {
  try {
    const formData = new FormData();
    if (image) formData.append("image", image);
    const res = await makeRequest().post(
      `/api/images/upload/${fileName}`,
      formData
    );
    return res;
  } catch (error) {
    console.error(error);
  }
};
