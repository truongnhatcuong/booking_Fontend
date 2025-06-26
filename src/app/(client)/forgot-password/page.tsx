"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import ResetPasswordForm from "./Components/ForgotPasswordForm";

const page = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  return (
    <div>
      <ResetPasswordForm />
    </div>
  );
};

export default page;
