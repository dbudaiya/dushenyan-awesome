import React from "react";
import { useRequest } from "ahooks";
import Mockjs from "mockjs";

function getUsername() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(Mockjs.mock("@name"));
    }, 1500);
  });
}

export default function BasicUse() {
  const { data, error, loading } = useRequest(getUsername);

  if (error) {
    return <div>错误请重试</div>;
  }
  if (loading) {
    return <div>请等待中....</div>;
  }

  return <div>Usename:{data}</div>;
}
