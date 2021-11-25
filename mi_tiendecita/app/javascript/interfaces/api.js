import { tableize, pluralize, singularize } from "inflected";
import authHeaders from "_helpers/auth";

const BASE_URL = "http://localhost:3000/api/v1/";

function prepareForURL(resourceName, plural = true) {
  const resource = tableize(resourceName);
  return plural ? pluralize(resource) : singularize(resource);
}

export function read(resourceName, requestParams = {}, options = {}) {
  return request(resourceName, requestParams, {
    ...options,
    method: "GET",
  });
}

export function create(resourceName, requestParams = {}, options = {}) {
  return request(resourceName, requestParams, {
    ...options,
    method: "POST",
  });
}

export function update(resourceName, requestParams = {}, options = {}) {
  return request(resourceName, requestParams, {
    ...options,
    method: "PATCH",
  });
}

export function destroy(resourceName, requestParams = {}, options = {}) {
  return request(resourceName, requestParams, {
    ...options,
    method: "DELETE",
  });
}

export function requestOptions(requestParams = {}, options = {}) {
  if (!requestParams.params) {
    return options;
  }

  return options.method === "GET"
    ? options
    : {
        ...options,
        body: JSON.stringify({
          ...requestParams.params,
        }),
      };
}

export function requestPath(resourceName, requestParams, options) {
  const { parentName, parentId, pluralizeResource, resourceId, params } =
    requestParams;
  const parentPrefix =
    typeof parentName === "undefined"
      ? ""
      : `${prepareForURL(parentName)}/${parentId}/`;
  const basePath = `${parentPrefix}${prepareForURL(
    resourceName,
    pluralizeResource
  )}`;
  const resourcePath =
    typeof resourceId === "undefined" ? basePath : `${basePath}/${resourceId}`;

  if (params && options.method === "GET") {
    const queryParams = Object.assign({}, params);

    Object.keys(queryParams).forEach(
      (key) => queryParams[key] === undefined && delete queryParams[key]
    );

    const queryString = new URLSearchParams(queryParams).toString();

    return queryString.length === 0
      ? resourcePath
      : `${resourcePath}?${queryString}`;
  }

  return resourcePath;
}

async function request(resourceName, requestParams, options) {
  const { data, errors } = await api(
    requestPath(resourceName, requestParams, options),
    requestOptions(requestParams, options)
  );

  return { data, errors };
}

export class APIError extends Error {
  constructor(status, statusText, data = {}) {
    super(`APIError ${status}: ${statusText}`);
    this.data = data;
  }
}

export const HTTP_STATUS = {
  NO_CONTENT: 204,
  NOT_MODIFIED: 304,
  UNAUTHORIZED: 401,
  UNPROCESSABLE_ENTITY: 422,
};

export async function api(path, options = {}) {
  const headers = {
    ...(options.headers ?? {}),
    ...(options.withAuth ? authHeaders() : {}),
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/json",
  };
  const targetUrl = new URL(path, BASE_URL);
  const response = await fetch(targetUrl.href, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const data = await response.json();
    throw new APIError(response.status, response.statusText, data?.errors);
  }

  if (response.status === HTTP_STATUS.NO_CONTENT) {
    return {};
  }

  const data = await response.json();

  let result = {
    ok: response.ok,
    status: response.status,
    ...(data.hasOwnProperty("data") ? data : { data }),
    errors: data?.errors,
  };

  return result;
}
