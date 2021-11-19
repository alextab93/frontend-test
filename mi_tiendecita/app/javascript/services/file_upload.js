async function getServiceUrl() {
  const response = { imageUploadUrl: "placeholder" };

  return response.imageUploadUrl;
}

export async function uploadToService(file) {
  const imageUploadUrl = await getServiceUrl(file);

  const options = {
    headers: {
      "Content-Type": "multipart/form-data; ",
      acl: "public-read",
    },
    body: file,
  };

  try {
    await fetch(imageUploadUrl.uploadUrl, {
      method: "PUT",
      ...options,
    });
    return imageUploadUrl.downloadUrl;
  } catch (error) {
    return "";
  }
}
