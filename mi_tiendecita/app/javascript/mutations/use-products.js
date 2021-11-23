import { useMutation } from "react-query";
import { read, create, update, destroy } from "_interfaces/api";
import { uploadToService } from "_services/file_upload";

async function createProduct({
  storeId,
  name,
  description,
  code,
  price,
  image,
}) {
  if (image?.uri) {
    imageUrl = await uploadToService(image);
  }

  const { data } = create("product", {
    parentName: "store",
    parentId: storeId,
    params: {
      name,
      description,
      code,
      price,
      imageUrl,
    },
  });

  return data;
}
