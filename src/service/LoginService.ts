import LoginResponse from "../model/LoginResponse";
import http from "../util/HttpClient";

const validateUser = async (username: string, password: string) => {
  const response = await http.get<LoginResponse>(
    `/user/validateCredentials?username=${username}&password=${password}`
  );
  return response.data;
};

const LoginService = {
  validateUser,
};

export default LoginService;
