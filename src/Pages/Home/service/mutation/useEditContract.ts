import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { formDataType } from "./fileType";

export const useEditContract = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: formDataType }) =>
      request.put(`/api/staff/contracts/${id}`, data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contracts"] });
    },
  });
};
