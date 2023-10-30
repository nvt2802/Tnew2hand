import axios from "axios";

export const getAllProduct = async (page,sortBy,searchName,searchCategory) => {
    const res = await axios.get(`http://localhost:8080/api/products/list?page=${page}&searchName=${searchName}&sortBy=${sortBy}&searchCategory=${searchCategory}`);
    return res;
}

export const getAllCategory = async () => {
    const res = await axios.get(`http://localhost:8080/api/products/category`);
    return res;
}

export const getProduct = async (id) => {
    const res = await axios.get(`http://localhost:8080/api/products/detail/${id}`);
    return res;
}


export const getNewProduct = async () => {
    const res = await axios.get(`http://localhost:8080/api/products/get-new`);
    return res;
}