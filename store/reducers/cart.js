import {ADD_TO_CART, REMOVE_FROM_CART} from "../actions/cart";
import CartItem from "../../models/CartItem";
import {ADD_ORDER} from "../actions/orders";
import {DELETE_PRODUCT} from "../actions/products";

const initialState = {
    items: {},
    totalAmount: 0
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const prodPrice = addedProduct.price;
            const prodTitle = addedProduct.title;
            let updatedOrNewCarItem;

            if(state.items.hasOwnProperty(addedProduct.id) && state.items[addedProduct.id]) {
                updatedOrNewCarItem= new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum + prodPrice
                );
            } else {
                updatedOrNewCarItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
            }


            return {
                ...state,
                items: {...state.items, [addedProduct.id]: updatedOrNewCarItem},
                totalAmount: state.totalAmount + prodPrice
            };
        case REMOVE_FROM_CART:
            const selected = state.items[action.id];
            const currentQty = selected.quantity;
            let updatedCartItems;

            if (currentQty > 1) {
                const updatedCartItem = new CartItem(
                    selected.quantity - 1,
                    selected.productPrice,
                    selected.productTitle,
                    selected.sum - selected.productPrice
                );

                updatedCartItems = {...state.items, [action.id]:updatedCartItem}
            } else {
                updatedCartItems = {...state.items};
                delete updatedCartItems[action.id];
            }

            return {
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - selected.productPrice
            };
        case ADD_ORDER:
            return initialState;
        case DELETE_PRODUCT:
            if(!state.items[action.id]) {
                return state;
            }

            const updatedItems = {...state.items};

            const total = state.items[action.id].sum;
            delete updatedItems[action.id];
            return {
                ...state,
                items: updatedItems,
                totalAmount: state.totalAmount - total
            };
        default:
            return state;
    }
};

export default reducer;