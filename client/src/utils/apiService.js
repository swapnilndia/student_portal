import { apiHelper } from "./helperFunctions";

class ApiService {
  static getInstance() {
    return new ApiService();
  }
  getAuthToken = () => {
    let userDetails = JSON.parse(localStorage.getItem("userDetails") || "");
    let token;
    if (userDetails) {
      token = userDetails.access_token;
      return token;
    }
    return null;
  };
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
  addNewDetails = async (body) => {
    const token = this.getAuthToken();
    console.log(token);
    const response = await apiHelper({
      method: "POST",
      url: "http://localhost:3001/student/prevdetails",
      body,
      headers: {
        "Content-type": "Application/json",
      },
      authToken: token,
    });
    console.log(response);
    return response.data;
  };
  getPrevDetails = async () => {
    const token = this.getAuthToken();
    const response = await apiHelper({
      method: "GET",
      url: "http://localhost:3001/student/prevdetails",
      headers: {
        "Content-type": "Application/json",
      },
      authToken: token,
    });
    return response.data.studentDetails;
  };
  editDetails = async (body) => {
    const token = this.getAuthToken();
    console.log(token);
    const response = await apiHelper({
      method: "PUT",
      url: "http://localhost:3001/student/prevdetails",
      body,
      headers: {
        "Content-type": "Application/json",
      },
      authToken: token,
    });
    console.log(response);
    return response.data;
  };
}

export const apiService = ApiService.getInstance();
