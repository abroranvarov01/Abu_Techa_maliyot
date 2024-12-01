import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { ContractType } from "./contractType";
export const useGetContract = () => {
  return useQuery({
    queryKey: ["contract"],
    queryFn: () =>
      request
        .get<ContractType>("/api/staff/contracts/all")
        .then((res) => res.data),
  });
};
