import { Skeleton } from "antd";
import { logoutUser } from "../services/api";

export const getUser = () => {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const setUser = (data: any) => {
  sessionStorage.setItem("user", JSON.stringify(data));
};

export const logout = async () => {
  sessionStorage.removeItem("user");
  const res = await logoutUser({});

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
