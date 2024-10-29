import axios from "axios";

const baseURL = process.env.REACT_APP_BASEURL;

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    // Check if the 'Authorization' header exists
    if (!config.headers["Authorization"]) {
      // Handle missing 'Authorization' header
      console.warn("Authorization header missing!");

      const token = sessionStorage.getItem("token");

      config.headers["Authorization"] = `Bearer ${
        token ? JSON.parse(token) : null
      }`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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

export const getDiscussionsFromDb = async () => {
  return await axios.get(`${baseURL}/event/discussion`).then((res) => {
    console.log(res.data);
    return res.data;
  });
};

export const addDiscussionsToDb = async (data: any) => {
  return await axios
    .post(`${baseURL}/event/discussion/addDiscussions`, data)
    .then((res) => {
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

export const getCommentFromdb = async (id: any, type: any) => {
  let res = null;
  if (type === "event")
    res = await axios.get(`${baseURL}/event/getEventComments/${id}/${type}`);
  else res = await axios.get(`${baseURL}/event/getComments/${id}/${type}`);
  return res.data;
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

export const getUsersFromDb = async () => {
  return await axios.get(`${baseURL}/users/getUsers`).then((res) => {
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

export const addUsersInDb = async (data: any) => {
  return await axios.post(`${baseURL}/users/addUser`, data).then((res) => {
    return res.data;
  });
};

export const loginFromDb = async (data: any) => {
  return await axios.post(`${baseURL}/users/login`, data).then((res) => {
    return res.data;
  });
};

export const updateUserinDb = async (data: any) => {
  return await axios
    .post(`${baseURL}/users/updateUserdata`, data)
    .then((res) => {
      return res.data;
    });
};

export const addDiscussionCommToDb = async (data: any) => {
  return await axios
    .post(`${baseURL}/event/discussion/addDiscussionsComm`, data)
    .then((res) => {
      return res.data;
    });
};

export const getDiscussionCommToDb = async (id: any) => {
  return await axios
    .get(`${baseURL}/event/discussion/getDiscussionsComm/${id}`)
    .then((res) => {
      return res.data;
    });
};

export const saveUserDataDb = async (data: any) => {
  return await axios
    .post(`${baseURL}/users/saveUserDataDb`, data)
    .then((res) => {
      return res.data;
    });
};

export const sendOtpToUser = async (email: string) => {
  return await axios
    .post(`${baseURL}/verify/send-otp`, { email })
    .then((res) => {
      return res.data;
    });
};

export const verifyOtp = async (data: any) => {
  return await axios.post(`${baseURL}/verify/verify-otp`, data).then((res) => {
    return res.data;
  });
};

export const logoutUser = async (data: any) => {
  return await axios.post(`${baseURL}/users/logoutUser`, data).then((res) => {
    return res.data;
  });
};

// this will return top 5 users related to role of logged in user
export const getPeopleFromDb = async (role: string, id: Number) => {
  return await axios.get(`${baseURL}/users/role/${role}/${id}`).then((res) => {
    return res.data;
  });
};

export const addMsgTodb = async (data: any) => {
  return await axios
    .post(`${baseURL}/messages/addMessage`, data)
    .then((res) => {
      return res.data;
    });
};

export const getMessagesFromDb = async (data: any) => {
  return await axios
    .post(`${baseURL}/messages/getMessages`, data)
    .then((res) => {
      return res.data;
    });
};
