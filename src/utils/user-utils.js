export const setUserToStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
}

export const getUserFromStorage = () => {
  return JSON.parse(localStorage.getItem("user"));
}

export const removeUserFromStorage = () => {
  localStorage.removeItem("user");
}