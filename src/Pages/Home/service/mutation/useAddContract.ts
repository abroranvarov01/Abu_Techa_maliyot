import { request } from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";
import { formDataType } from "./fileType";

export const useAddContract = () => {
  return useMutation((data: formDataType) => {
    return request
      .post("/api/staff/contracts/create", data)
      .then((res) => res.data);
  });
};
