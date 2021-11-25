import { useMutation } from "react-query";
import { create } from "_interfaces/api";
import * as Cookies from "js-cookie";

async function createSession({ email, password }) {
  const { data } = await create("login", {
    pluralizeResource: false,
    params: { email, password },
  });

  Cookies.set("session", JSON.stringify(data), { expires: 1 });

  return data;
}

export function useLogIn() {
  return useMutation(createSession);
}

async function endSession() {
  const { data } = await create(
    "logout",
    {
      pluralizeResource: false,
    },
    { withAuth: true }
  );
  Cookies.remove("session");
  return data;
}

export function useLogOut() {
  return useMutation(endSession);
}
