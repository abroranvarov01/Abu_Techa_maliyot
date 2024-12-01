import { request } from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";
import { loginType, tokenType } from "./loginType";

const useLogin = () => {
  return useMutation((data: loginType) => {
    return request.post<tokenType>("/api/staff/auth/sign-in", data);
  });
};
export default useLogin;
