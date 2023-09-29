import React from "react";
import { NextPage } from "next";
import LoginForm from "@/app/example/login/client/LoginForm";

const Page: NextPage = () => {
  return (
    <>
      <h1>로그인 페이지</h1>
      <LoginForm />
    </>
  );
};

export default Page;
