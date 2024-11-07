import LoginForm from "@/components/LoginForm";
import { AUTH_CONFIG } from "@/configs/auth.config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession(AUTH_CONFIG);

  if (session) return redirect('/dashboard');

  return (
    <div className="container vstack justify-content-center">
      <div className="row">
        <div className="col">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
