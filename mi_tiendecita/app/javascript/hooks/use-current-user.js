import { useSession } from "_queries";

export default function useCurrentUser() {
  const { data: session } = useSession();
  return session.user;
}
