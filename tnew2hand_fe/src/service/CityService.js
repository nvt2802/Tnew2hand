import axios from "axios";

export const getAllCity = async () => {
  const res = await axios.get(`https://provinces.open-api.vn/api/?depth=2`);
  return res;
}