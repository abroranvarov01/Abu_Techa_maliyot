import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";
import { ContractType } from "./contractType";
const useGetContract = () => {
  return useQuery({
    queryKey: ["contract"],
    queryFn: () =>
      request
        .get<ContractType>("/api/staff/contracts/all")
        .then((res) => res.data),
  });
};

export default useGetContract;
