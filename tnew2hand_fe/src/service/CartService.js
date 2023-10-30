import axios from "axios";

export const getQuantity = async (userName) => {
  if(userName===undefined){
    userName="";
  }
  const res = await axios.get(`http://localhost:8080/api/order/get-quantity-cart?userName=${userName}`)
  return res
}

export const addToCart = async (userName,productId,quantity) => {
  const res = await axios.post(`http://localhost:8080/api/order/add-to-card?productId=${productId}&userName=${userName}&quantity=${quantity}`);
  return res
}
export const getAllCart = async (userName) => {
  if(userName===undefined){
    userName="";
  }
  const res = await axios.get(`http://localhost:8080/api/order/get-all-cart?userName=${userName}`)
  return res
}
export const deleteCartItem = async (id) => {
  const res = await axios.delete(`http://localhost:8080/api/order/delete-cart-item/${id}`)
  return res
}