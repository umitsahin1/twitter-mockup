import axios from "axios";

function getApi() {
  const user = localStorage.getItem("user");
  const token = user ? JSON.parse(user).authToken : null;
  return axios.create({
    baseURL: "https://reqres.in/api",
    headers: token
      ? {
          Authorization: token,
        }
      : {},
  });
}
export const API = getApi();
