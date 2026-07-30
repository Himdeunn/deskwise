import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function HomePage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (session.user.role === "SUPER_ADMIN" || session.user.role === "ADMIN") {
    redirect("/dashboard");
  }

  redirect("/my-orders");
}
