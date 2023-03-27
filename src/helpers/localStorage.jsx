export const saveLogin = (data) => {
  localStorage.setItem("data-login", JSON.stringify(data));
};

export const removeLogin = () => {
  localStorage.removeItem("data-login");
};

export const getLoginData = () => JSON.parse(localStorage.getItem("data-login"));

export const getLoginToken = () => {
  const data_login = getLoginData();
  return data_login ? data_login.access_token : null;
};

export const getUserData = () => getLoginData().user;