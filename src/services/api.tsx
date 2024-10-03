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

export const addEventToDb = async (data: any) => {
  console.log(data);
  return await axios.post(`${baseURL}/event/addEvent`, data).then((res) => {
    return res;
  });
};

export const updateEventInDb = async (data: any) => {
  return await axios.post(`${baseURL}/event/updateEvent`, data).then((res) => {
    return res;
  });
};

export const getEventFromDb = async () => {
  console.log(`${baseURL}/event/`);
  return await axios.get(`${baseURL}/event/`).then((res) => {
    return res.data;
  });
};

export const updateEventLikesInDb = async (data: any) => {
  return await axios.post(`${baseURL}/event/updateLikes`, data).then((res) => {
    return res.data;
  });
};

export const updateEventViews = async (data: any) => {
  return await axios.post(`${baseURL}/event/updateViews`, data).then((res) => {
    return res.data;
  });
};

export const getCommentFromdb = async (id: any, type: any) => {
  let res = null;
  if (type == "event")
    res = await axios.get(`${baseURL}/event/getEventComments/${id}/${type}`);
  else res = await axios.get(`${baseURL}/event/getComments/${id}/${type}`);
  return res.data;
};
