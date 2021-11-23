import { useMutation } from "react-query";
import { create } from "_interfaces/api";

async function createSession({ email, password }) {
  const { data } = await create("login", {
    pluralizeResource: false,
    params: { email, password },
  });

  return data;
}

export function useLogIn() {
  return useMutation(createSession);
}
