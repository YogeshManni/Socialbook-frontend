import { Skeleton } from "antd";

import axios from "axios";

export const getUser = () => {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const setUser = (res: any) => {
  sessionStorage.setItem("token", JSON.stringify(res.token));
  sessionStorage.setItem("user", JSON.stringify(res.data));
};

export const setAuthHeader = () => {
  const token = sessionStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${
    token ? JSON.parse(token) : null
  }`;
};

export const logout = async () => {
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("token");
  window.location.href = "/";
};

export const Loader = () => {
  return (
    <>
      {" "}
      {Array.from({ length: 3 }).map((_, idx) => (
        <>
          <Skeleton key={idx} active />
          <br />
          <br />
        </>
      ))}
    </>
  );
};
