"use client";

import { signIn } from "next-auth/react";

export default function LoginForm() {
  const loginAction = async () => {
    await signIn("google");
  };

  return (
    <div className="portlet">
      <div className="portlet-body vstack gap-2 p-5 text-center">
        <h1>Sidosurat</h1>
        <p>
          Aplikasi surat menyurat khusus desa yang memudahkan proses
        administrasi dengan lebih efisien dan transparan
        </p>
        <button
          className="btn btn-primary btn-lg w-100 rounded-pill"
          onClick={loginAction}
        >
          Login dengan Google
        </button>
      </div>
    </div>
  );
}
