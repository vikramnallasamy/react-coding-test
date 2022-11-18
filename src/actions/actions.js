import { LOGIN } from "../constants/constants"

export const logIn = (username,password) => ({
    type : LOGIN,
    payload : {
        username: username,
        password : password
    }
})