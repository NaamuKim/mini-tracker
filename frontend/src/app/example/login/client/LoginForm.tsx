"use client";
import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { fetcher } from "@/app.module/fetcher";
const LoginForm: NextPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const { push } = useRouter();
  const handleChange =
    (setState: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setState(e.target.value);
    };
  const onSubmitForm = async (
    e: React.FormEvent<HTMLFormElement | HTMLButtonElement>,
  ) => {
    e.preventDefault();
    await fetcher({
      url: "http://localhost:8080/login",
      method: "POST",
      body: { userId: id, password },
    });
    push("/");
    setId("");
    setPassword("");
  };

  return (
    <form onSubmit={onSubmitForm}>
      <label htmlFor="user-id">아이디</label>
      <input
        id="user-id"
        type="text"
        placeholder="아이디"
        onChange={handleChange(setId)}
      />
      <label htmlFor="password">비밀번호</label>
      <input
        id="password"
        type="password"
        placeholder="비밀번호"
        onChange={handleChange(setPassword)}
      />
      <button type="submit">로그인</button>
    </form>
  );
};

export default LoginForm;
