import axios from "axios";

const baseURL = process.env.REACT_APP_BASEURL;

export const loginFromDb = async (data: any) => {
  return await axios.post(`${baseURL}/users/login`, data).then((res) => {
    return res.data;
  });
};

export const addUsersInDb = async (data: any) => {
  return await axios.post(`${baseURL}/users/addUser`, data).then((res) => {
    return res.data;
  });
};

export const addPost = async (obj: any) => {
  return await axios.post(`${baseURL}/posts/addPost`, obj).then((res) => {
    return res.data;
  });
};

export const getPostsFromDb = async (obj: any) => {
  return await axios.post(`${baseURL}/posts/`, obj).then((res) => {
    return res.data;
  });
};

export const updatePostLikesInDb = async (data: any) => {
  return await axios.post(`${baseURL}/posts/updateLikes`, data).then((res) => {
    return res.data;
  });
};

export const addCommentTodb = async (data: any) => {
  return await axios
    .post(`${baseURL}/event/comments/addComments`, data)
    .then((res) => {
      return res.data;
    });
};
