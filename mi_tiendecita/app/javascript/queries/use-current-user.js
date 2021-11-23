import { useQuery } from "react-query";
import { read } from "_interfaces/api";

async function getCurrentUser() {
  const headers = {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2Mzc5Nzc3MDEsImlhdCI6MTYzNzM3MjkwMX0.s6GD0uofYlzVmCLq1d10V4CAfHIjuymST6RORTZTV6w",
  };
  const { data } = await read(
    "current_user",
    { pluralizeResource: false },
    { headers }
  );
  return data;
}

export function useCurrentUser() {
  return useQuery("current-user", () => getCurrentUser());
}
