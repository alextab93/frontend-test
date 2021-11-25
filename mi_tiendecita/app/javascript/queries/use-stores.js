import { useQuery } from "react-query";
import { read } from "_interfaces/api";

async function getStores() {
  const { data } = await read("store", {}, { withAuth: true });
  return data;
}

export function useStores() {
  return useQuery("stores", () => getStores(), {
    suspense: true,
  });
}
