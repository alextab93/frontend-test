import { read } from "_interfaces/api";
import { useQuery } from "react-query";

async function getProduct(productId) {
  const { data } = await read(
    "product",
    { resourceId: productId },
    { withAuth: true }
  );
  return data;
}

export function useProduct(productId) {
  return useQuery(["product", productId], () => getProduct(productId), {
    suspense: true,
  });
}
