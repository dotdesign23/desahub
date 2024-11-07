"use client"

import { signIn } from "next-auth/react";

export default function LoginForm() {
  const loginAction = async () => {
    await signIn("google");
  };

  return (
    <div className="portlet">
      <div className="portlet-body vstack gap-2 p-5 text-center">
        <h1>DesaHub</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam
          officia molestiae voluptatem dicta voluptatum at inventore corporis,
          odio esse, reiciendis libero quod soluta, eaque suscipit molestias.
          Enim ipsam voluptatem omnis?
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
