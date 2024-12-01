import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { formDataType } from "./fileType";

export const useFayl = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request
        .post<formDataType>("/api/staff/upload/contract/attachment", data)
        .then((res) => res.data),
  });
};
