import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE } from "../constants/constants";

const initialState = {
    username : null,
    isLoggedIn : false,
    accessToken : null,
    refreshToken : null,
    isLoading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
       case LOGIN:
          return { ...state,isLoggedIn:false, isLoading: true,username: null };
        case LOGIN_SUCCESS :
            return { ...state,isLoggedIn: true,isLoading: false,
                username: action.payload.username,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken
            }
        case LOGIN_FAILURE :
            return { ...state,isLoggedIn: false,isLoading: false,username: null}
       default:
          return state;
     }
  };
  export default reducer