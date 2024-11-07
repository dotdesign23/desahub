"use client";

import { signOut } from "next-auth/react";

export default function LogoutForm() {
  const logoutAction = async () => {
    await signOut();
  };

  return (
    <div className="vstack align-items-center">
      <button
        className="btn btn-subtle-danger btn-widest rounded-pill"
        onClick={logoutAction}
      >
        Keluar
      </button>
    </div>
  );
}
