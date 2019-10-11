import {CREATE_PRODUCT, SET_PRODUCTS} from "./products";
import Product from "../../models/Product";
import Order from "../../models/Order";

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => {
    return async dispatch => {
        const response = await fetch('https://rn-complete-guide-f81a2.firebaseio.com/orders/u1.json');

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
    return async dispatch => {
        const date = new Date();

        const response = await fetch('https://rn-complete-guide-f81a2.firebaseio.com/orders/u1.json', {
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