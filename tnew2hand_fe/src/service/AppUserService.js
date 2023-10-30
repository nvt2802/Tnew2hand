import axios from "axios";
import jwt_decode from "jwt-decode";

export const loginByUserName = async (appUser) => {
  const res = await axios.post(`http://localhost:8080/api/user/login-by-username`,appUser)
  return res
}

export const signupByUserName = async (appUser) => {
  const res = await axios.post(`http://localhost:8080/api/user/signup`,appUser)
  return res
}

export const addJwtTokenToLocalStorage = (jwtToken) => {
  localStorage.setItem("JWT", jwtToken);
};

export const infoAppUserByJwtToken = () => {
  const jwtToken = localStorage.getItem("JWT");
  if (jwtToken) {
    const result = jwt_decode(jwtToken);
    return result.sub;
  }
};