import axios from "axios";

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
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("API Error Response:", error.response);
      throw error.response.data;
    } else if (error.request) {
      console.error("API Error Request:", error.request);
      throw new Error("No response received from the server.");
    } else {
      console.error("API Error:", error.message);
      throw new Error(error.message);
    }
  }
};
