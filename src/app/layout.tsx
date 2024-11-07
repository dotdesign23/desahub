/* eslint-disable @next/next/no-page-custom-font */
"use client";

import "$/bootstrap/styles/bootstrap.scss";
import "$/sweetalert2/styles/sweetalert2.scss";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" dir="ltr" data-bs-theme="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Roboto+Mono&display=swap"
        />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <title>DesaHub</title>
      </head>
      <body>
        <div className="holder">
          <div className="wrapper">
            <div className="content">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
