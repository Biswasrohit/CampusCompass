import { withAuth } from "@workos-inc/authkit-nextjs";
import ClientApp from "@/components/ClientApp";

export default async function Home() {
  const { user } = await withAuth();

  if (!user) {
    return null;
  }

  const workosUser = {
    id: user.id,
    name: [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email,
    email: user.email,
  };

  return <ClientApp workosUser={workosUser} />;
}
