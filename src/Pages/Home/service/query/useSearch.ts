import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";

interface SearchType {
  page: number;
  size: number;
  search: string;
}

export const useSearch = ({ page, size, search }: SearchType) => {
  return useQuery({
    queryKey: ["search", page, size, search],
    queryFn: () =>
      request
        .get(`/api/staff/contracts/all?&search=${search}`)
        .then((res) => res.data),
  });
};
