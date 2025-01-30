'use client'
import React from "react";
import { useSession } from "next-auth/react";

const LoginPage = () => {
  const { data: session } = useSession();
  console.log("User session:", session);
  return (
    <>
      <h1>This is login Page</h1>
    </>
  );
};

export default LoginPage;
