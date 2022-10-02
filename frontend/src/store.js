import { combineReducers, applyMiddleware } from "redux";
import { legacy_createStore as createStore} from 'redux';
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {productListReducer} from './reducers/productReducer'
import productDetailsReducer from "./reducers/productDetailsReducer";
import { cartReducer } from "./reducers/cartReducer";
import {userLoginReducer, userRegisterReducer, userDetailsreducer, userUpdateProfileReducer} from "./reducers/userReducer"
import { orderCreateReducer,orderDetailsReducer, orderPayReducer, orderListReducer } from "./reducers/orderReducer";

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart : cartReducer,
    userLogin : userLoginReducer,
    userRegister : userRegisterReducer,
    userDetails : userDetailsreducer,
    userUpdateProfile : userUpdateProfileReducer,
    orderCreate : orderCreateReducer,
    orderDetails : orderDetailsReducer,
    orderPay : orderPayReducer,
    orderList : orderListReducer,
});

const shippingAddressfromLocalStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {};

const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
    cart : {cartItems : cartItemsFromLocalStorage, shippingAddress: shippingAddressfromLocalStorage},
    userLogin : {userInfo: userInfoFromLocalStorage}
}
const middleware = [thunk];
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;