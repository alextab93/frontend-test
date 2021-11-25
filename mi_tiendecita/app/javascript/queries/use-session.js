import { useQuery } from "react-query";
import * as Cookies from "js-cookie";

function getSession() {
  const session = Cookies.get("session");
  return session ? JSON.parse(session) : null;
}

export function useSession() {
  return useQuery("session", () => getSession());
}
