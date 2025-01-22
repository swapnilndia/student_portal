import { apiHelper } from "./helperFunctions";

class ApiService {
  static getInstance() {
    return new ApiService();
  }
  studentRegister = async (body) => {
    const response = await apiHelper({
      method: "POST",
      url: "http://localhost:3001/student/register",
      body,
      headers: {
        "Content-type": "Application/json",
      },
    });
    return response;
  };
  studentLogin = async (body) => {
    const response = await apiHelper({
      method: "POST",
      url: "http://localhost:3001/student/login",
      body,
      headers: {
        "Content-type": "Application/json",
      },
    });
    return response;
  };
}

export const apiService = ApiService.getInstance();
