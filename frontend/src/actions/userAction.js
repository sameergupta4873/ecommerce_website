import axios from 'axios';
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL,USER_LOGOUT, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_UPDATE_SUCCESS,USER_UPDATE_FAIL,USER_UPDATE_REQUEST,USER_UPDATE_RESET, USER_REGISTER_RESET} from "../constants/userConstants";
import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL} from "../constants/userConstants";
import { CART_RESET_ITEM } from '../constants/cartConstants';
export const logout = () => dispacth => {
    
    dispacth({type:USER_REGISTER_RESET})
    dispacth({type: USER_LOGOUT})
    dispacth({type:CART_RESET_ITEM})
}
export const login = (email, password) => async (dispacth,getState) => {
    try {
        dispacth({type:USER_LOGIN_REQUEST})
        const config = {headers: {'Content-Type' : 'application/json'}}
        const {data} = await axios.post('/api/users/login', {email, password, config})
        dispacth({
            type: USER_LOGIN_SUCCESS,
            payload:data
        })
        
        
    localStorage.setItem('userInfo',JSON.stringify(getState().userLogin.userInfo))
    dispacth({
        type: USER_DETAILS_SUCCESS,
        payload : data
    })
    } catch (error) {
        dispacth({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}
export const register = (name, email, password) => async dispacth => {
    try {
        dispacth({type:USER_REGISTER_REQUEST})
        const config = {headers: {'Content-Type' : 'application/json'}}
        const {data} = await axios.post('/api/users', {name,email, password,config})
        dispacth({
            type: USER_REGISTER_SUCCESS,
            payload:data,
        })
        dispacth({
            type: USER_LOGIN_SUCCESS,
            payload:data
        })
        
    localStorage.setItem('userInfo',JSON.stringify(data))
    } catch (error) {
        dispacth({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}

export const getUserDetails = (id) => async (dispacth, getState )=> {
    try {
        dispacth({
            type: USER_DETAILS_REQUEST,
        })
        const {userLogin:{userInfo}} = getState();
        const config = {headers: {'Content-Type' : 'application/json', Authorization:`Bearer ${userInfo.token}`}};
        const {data} = await axios.get(`api/users/${userInfo._id}`,config)
        
        dispacth({
            type: USER_DETAILS_SUCCESS,
            payload : data
        })
        
    } catch (error) {
        dispacth({
            type:USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
};

export const updateUserProfile = (user) => async(dispacth,getState) => {
    try {
        dispacth({
            type: USER_UPDATE_REQUEST,
        })
        const {userLogin:{userInfo}} = getState()
        const config = {headers: {'Content-Type' : 'application/json', Authorization:`Bearer ${userInfo.token}`}};
        const {data} =  await axios.put('api/users/profile',user,config)
        dispacth({
            type: USER_UPDATE_SUCCESS,
            payload: data
        })
        dispacth({
            type: USER_LOGIN_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispacth({
            type: USER_UPDATE_FAIL,
            payload : error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}

export default {login,logout,register,getUserDetails}