import { USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL } from "../constants/userConstants"

export const userRegisterReducer = (state = {}, action) => {
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {loading: false}
        case USER_REGISTER_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case USER_REGISTER_FAIL:
            return {loading: false, error: action.payload}
        default:
            return {...state}
    }
}
export const userSigninReducer = (state = {}, action) => {
    switch(action.type){
        case USER_SIGNIN_REQUEST:
            return {loading: true}
        case USER_SIGNIN_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case USER_SIGNIN_FAIL:
            return {loading: false, error: action.payload}
        case USER_SIGNOUT:
            return {};
        case USER_REGISTER_REQUEST:
            return {loading: false}
        case USER_REGISTER_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case USER_REGISTER_FAIL:
            return {loading: false, error: action.payload}
        default:
            return {...state}
    }
}