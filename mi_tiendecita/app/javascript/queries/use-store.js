import { useQuery } from "react-query";
import { read } from "_interfaces/api";

async function getStore(storeId) {
  const { data } = await read(
    "store",
    { resourceId: storeId },
    { withAuth: true }
  );
  return data;
}

export function useStore(storeId) {
  return useQuery(["store", storeId], () => getStore(storeId), {
    suspense: true,
  });
}
