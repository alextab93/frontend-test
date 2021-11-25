import { read } from "_interfaces/api";

async function getServiceUrl() {
  const { data } = await read(
    "s3_direct_post",
    { pluralizeResource: false, params: { directory: "store_1" } },
    { withAuth: true }
  );

  return data;
}

export async function uploadToService(file) {
  const imageUploadUrl = await getServiceUrl(file);

  const options = {
    headers: {
      "Content-Type": file.type,
      acl: "public-read",
    },
    body: file,
  };

  try {
    await fetch(imageUploadUrl.postUrl, {
      method: "PUT",
      ...options,
    });
    return imageUploadUrl.getUrl;
  } catch (error) {
    return "";
  }
}
