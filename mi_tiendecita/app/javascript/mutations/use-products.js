import { useMutation } from "react-query";
import { create, update, destroy } from "_interfaces/api";
import { uploadToService } from "_services/file_upload";

async function createProduct({
  storeId,
  name,
  description,
  code,
  price,
  image,
}) {
  const headers = {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2Mzc5Nzc3MDEsImlhdCI6MTYzNzM3MjkwMX0.s6GD0uofYlzVmCLq1d10V4CAfHIjuymST6RORTZTV6w",
  };
  let imageUrl = "";

  if (image?.dataUrl) {
    imageUrl = await uploadToService(image.file);
  }

  const { data } = create(
    "product",
    {
      parentName: "store",
      parentId: storeId,
      params: {
        name,
        description,
        code,
        price,
        imageUrl,
      },
    },
    { headers }
  );

  return data;
}

export function useCreateProduct() {
  return useMutation(createProduct);
}

async function deleteProduct({ productId }) {
  const headers = {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2Mzc5Nzc3MDEsImlhdCI6MTYzNzM3MjkwMX0.s6GD0uofYlzVmCLq1d10V4CAfHIjuymST6RORTZTV6w",
  };
  const { data } = destroy(
    "product",
    {
      resourceId: productId,
    },
    { headers }
  );

  return data;
}

export function useDeleteProduct() {
  return useMutation(deleteProduct);
}

async function updateProduct({ productId, product, newImage, oldImage }) {
  const headers = {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2Mzc5Nzc3MDEsImlhdCI6MTYzNzM3MjkwMX0.s6GD0uofYlzVmCLq1d10V4CAfHIjuymST6RORTZTV6w",
  };

  let imageUrl = oldImage;

  if (newImage) {
    imageUrl = await uploadToService(newImage.file);
  }

  const updatedProduct = { ...product, imageUrl };

  const { data } = update(
    "product",
    {
      resourceId: productId,
      params: {
        product: updatedProduct,
      },
    },
    { headers }
  );

  return data;
}

export function useUpdateProduct() {
  return useMutation(updateProduct);
}
