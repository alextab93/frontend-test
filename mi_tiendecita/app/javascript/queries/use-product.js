import { read } from "_interfaces/api";
import { useQuery } from "react-query";

async function getProduct(productId) {
  const headers = {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2Mzc5Nzc3MDEsImlhdCI6MTYzNzM3MjkwMX0.s6GD0uofYlzVmCLq1d10V4CAfHIjuymST6RORTZTV6w",
  };

  const { data } = await read(
    "product",
    { resourceId: productId },
    { headers }
  );
  return data;
}

export function useProduct(productId) {
  return useQuery(["product", productId], () => getProduct(productId), {
    suspense: true,
  });
}
