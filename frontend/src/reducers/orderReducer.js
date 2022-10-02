import { ORDER_CREATE_FAILS, ORDER_CREATE_REQUEST, ORDER_CREATE_RESET, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAILS, ORDER_DETAILS_REQUEST, ORDER_DETAILS_RESET, ORDER_DETAILS_SUCCESS, ORDER_LIST_MY_FAILS, ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS, ORDER_PAY_FAILS, ORDER_PAY_REQUEST, ORDER_PAY_RESET, ORDER_PAY_SUCCESS } from '../constants/orderConstants'

export const orderCreateReducer = ( state = {}, action) => {
    switch(action.type){
        case ORDER_CREATE_REQUEST:
            return {loading:true};
        case ORDER_CREATE_SUCCESS:
            return {loading:false, success:true,order:action.payload};
        case ORDER_CREATE_FAILS:
            return {loading:false, error:action.payload};
        case ORDER_CREATE_RESET:
            return {}
            
        default:
            return state;
    }
}

export const orderDetailsReducer = ( state = {orderItems:[], loading:true, shippingAddress:{}}, action) => {
    switch(action.type){
        case ORDER_DETAILS_REQUEST:
            return {...state,loading:true};
        case ORDER_DETAILS_SUCCESS:
            return {loading:false, order:action.payload};
        case ORDER_DETAILS_FAILS:
            return {loading:false, error:action.payload};
        case ORDER_DETAILS_RESET:
            return {
                orderItems:[], loading:true, shippingAddress:{}
                  
            }
        default:
            return state;
    }
}

export const orderPayReducer = (state = {},action)=>{
    switch(action.type){
        case ORDER_PAY_REQUEST:
            return {loading : true}
        case ORDER_PAY_SUCCESS:
            return {loading: false,success:true, userInfo:action.payload }
        case ORDER_PAY_FAILS:
            return {loading: false, error: action.payload }
        case ORDER_PAY_RESET:
            return {}
        default:
            return state;
    }
};
export const orderListReducer = (state = {},action)=>{
    switch(action.type){
        case ORDER_LIST_MY_REQUEST:
            return {loading : true}
        case ORDER_LIST_MY_SUCCESS:
            return {loading: false,orders:action.payload}
        case ORDER_LIST_MY_FAILS:
            return {loading: false, error: action.payload }
        default:
            return state;
    }
};