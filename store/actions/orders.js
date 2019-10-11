import {CREATE_PRODUCT, SET_PRODUCTS} from "./products";
import Product from "../../models/Product";
import Order from "../../models/Order";

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        const response = await fetch(`https://rn-complete-guide-f81a2.firebaseio.com/orders/${userId}.json`);

        const data = await response.json();

        const loaded = [];

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                loaded.push(new Order(
                    key,
                    data[key].cartItems,
                    data[key].totalAmount,
                    new Date(data[key].date)
                ));
            }
        }

        dispatch({type: SET_ORDERS, orders: loaded})
    };
};
export const addOrder = (cartItems, totalAmount) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const date = new Date();

        const response = await fetch(`https://rn-complete-guide-f81a2.firebaseio.com/orders/${userId}.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cartItems,
                totalAmount,
                date: date.toISOString()
            })
        });

        const data = await response.json();

        dispatch({
            type: ADD_ORDER,
            orderData: {
                id: data.name,
                items: cartItems,
                amount: totalAmount,
                date: date
            }
        });
    };
};