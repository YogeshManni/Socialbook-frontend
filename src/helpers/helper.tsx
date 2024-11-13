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

interface LoaderProps {
  width?: number;
}

export const Loader = (props: LoaderProps) => {
  //console.log(props.width);
  return (
    <>
      {" "}
      {Array.from({ length: 3 }).map((_, idx) => (
        <>
          <Skeleton key={idx} active className={`w-[${props.width}px] p-5`} />
          <br />
          <br />
        </>
      ))}
    </>
  );
};

export const getVideoDuration = (videoUrl: string) => {
  return new Promise((resolve, reject) => {
    const videoElement = document.createElement("video");
    videoElement.src = videoUrl;

    // Event listener to handle when the metadata of the video has loaded
    videoElement.onloadedmetadata = () => {
      resolve(videoElement.duration); // The video duration in seconds
    };

    // If there's an error, reject the promise
    videoElement.onerror = (error) => {
      reject("Error loading video");
    };
  });
};
