import { read } from "_interfaces/api";

async function getServiceUrl() {
  const headers = {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2Mzc5Nzc3MDEsImlhdCI6MTYzNzM3MjkwMX0.s6GD0uofYlzVmCLq1d10V4CAfHIjuymST6RORTZTV6w",
  };

  const { data } = await read(
    "s3_direct_post",
    { pluralizeResource: false, params: { directory: "store_1" } },
    { headers }
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
