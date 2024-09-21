export const getUser = () => {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const setUser = (data: any) => {
  sessionStorage.setItem("user", JSON.stringify(data));
};

export const logout = () => {
  sessionStorage.removeItem("user");
  window.location.href = "/";
};
