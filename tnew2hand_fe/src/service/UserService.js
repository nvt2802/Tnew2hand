import axios from "axios";

export const getUserByUserName = async (userName) => {
    const res = await axios.get(`http://localhost:8080/api/users/get-user-by-username?userName=${userName}`)
    return res;
}

export const updateUser = async (user) => {
    const res = await axios.patch(`http://localhost:8080/api/users/update-user/${user.id}`,user)
    return res;
}