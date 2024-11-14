import LogoutForm from "@/components/LogoutForm";
import { AUTH_CONFIG } from "@/configs/auth.config";
import { getServerSession } from "next-auth";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(AUTH_CONFIG);

  return (
    <div className="container g-5">
      <div className="row">
        <div className="col">
          <div className="vstack text-center gap-2 my-5">
            <h1>Selamat Datang</h1>
            <h2>{session?.user?.name}</h2>
          </div>
          {children}
          <LogoutForm />
        </div>
      </div>
    </div>
  );
}
