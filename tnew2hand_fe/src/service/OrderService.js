import axios from "axios";
import Swal from "sweetalert2";

export const createOrder = async (userName,userDto) => {
    const res = await axios.post(`http://localhost:8080/api/order/create-order?userName=${userName}`,userDto);
    return res;
}

export const getOrdersHistory = async (userName) => {
    const res = await axios.get(`http://localhost:8080/api/order/get-order-history?userName=${userName}`);
    return res;
}
export const getOrder = async (id,userName) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/order/get-order?id=${id}&userName=${userName}`);
        return res;
    }catch (e){
        Swal.fire("Can't found!", "", "error");
    }
}