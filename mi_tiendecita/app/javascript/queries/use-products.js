import { useQuery } from "react-query";
import { read } from "_interfaces/api";

async function getProducts(storeId) {
  const { data } = read("products", {
    parentId: storeId,
    parentName: "stores",
  });

  return data;
}

export function useProducts(storeId) {
  return useQuery(["store", storeId, "products"], () => getProducts(storeId), {
    suspense: true,
  });
}
