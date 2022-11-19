import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE, GET_PROFILE } from "../Saga/constants";

const initialState = {
    username : null,
    isLoggedIn : false,
    accessToken : null,
    refreshToken : null,
    isLoading: false,
    errorMessage: ''
}

const reducer = (state = initialState, action) => {
    const { payload } = action
    switch (action.type) {
        case GET_PROFILE:
            return { ...state,isLoggedIn:true, isLoading: false,username: payload.name };
        case LOGIN:
           return { ...state,isLoggedIn:false, isLoading: true,username: null };
        case LOGIN_SUCCESS :
            return { 
                ...state,
                isLoggedIn: true,
                isLoading: false,
                username: payload.username,
                accessToken: payload.accessToken,
                refreshToken: payload.refreshToken
            }
        case LOGIN_FAILURE :
            return { ...state,isLoggedIn: false,isLoading: false,username: null,errorMessage: payload}
       default:
          return state;
     }
  };
  export default reducer