import axios from "axios";
import { UserLoginParams } from "../types/login-types"

export const loginUser = (body: UserLoginParams) => {
  return axios.post(`/auth/login`, body);
}
