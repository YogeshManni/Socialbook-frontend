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
