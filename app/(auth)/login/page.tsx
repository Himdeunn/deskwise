import { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { Skeleton } from "@/components/ui/Skeleton";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 p-4">
      <Suspense fallback={<Skeleton className="h-[420px] w-full max-w-md rounded-2xl" />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
