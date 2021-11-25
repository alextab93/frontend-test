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
  let imageUrl = "";

  if (image?.dataUrl) {
    imageUrl = await uploadToService(image.file);
  }

  const { data } = await create(
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
    { withAuth: true }
  );

  return data;
}

export function useCreateProduct() {
  return useMutation(createProduct);
}

async function deleteProduct({ productId }) {
  const { data } = await destroy(
    "product",
    {
      resourceId: productId,
    },
    { withAuth: true }
  );

  return data;
}

export function useDeleteProduct() {
  return useMutation(deleteProduct);
}

async function updateProduct({ productId, product, newImage, oldImage }) {
  let imageUrl = oldImage;

  if (newImage) {
    imageUrl = await uploadToService(newImage.file);
  }

  const updatedProduct = { ...product, imageUrl };

  const { data } = await update(
    "product",
    {
      resourceId: productId,
      params: {
        product: updatedProduct,
      },
    },
    { withAuth: true }
  );

  return data;
}

export function useUpdateProduct() {
  return useMutation(updateProduct);
}
