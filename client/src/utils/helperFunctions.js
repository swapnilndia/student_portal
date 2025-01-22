import axios from "axios";
import { toast } from "react-toastify";

export const apiHelper = async ({
  method = "GET",
  url,
  body = null,
  headers = {},
  authToken = null,
}) => {
  try {
    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }

    const config = { method, url, data: body, headers };
    const response = await axios(config);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response) {
      toast.error(error.response.data.message);
      throw error.response.data;
    } else if (error.request) {
      toast.error("API Error Request:", error.request);
      throw new Error("No response received from the server.");
    } else {
      toast.error("API Error:", error.message);
      throw new Error(error.message);
    }
  }
};
