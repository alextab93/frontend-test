import * as Cookies from "js-cookie";

export default function authHeaders() {
  const session = Cookies.get("session")
    ? JSON.parse(Cookies.get("session"))
    : "";
  return { Authorization: `Bearer ${session.token}` };
}
