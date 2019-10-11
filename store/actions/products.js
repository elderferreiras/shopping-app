import Product from "../../models/Product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;

        const response = await fetch('https://rn-complete-guide-f81a2.firebaseio.com/products.json');

        const data = await response.json();

        const loaded = [];

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                loaded.push(new Product(key, data[key].ownerId,
                    data[key].title,
                    data[key].imageUrl,
                    data[key].description,
                    data[key].price,
                ));
            }
        }

        dispatch({type: SET_PRODUCTS, products: loaded.filter(p => p.ownerId === userId)})
    }
};

export const deleteProduct = id => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        await fetch(`https://rn-complete-guide-f81a2.firebaseio.com/products/${id}.json?auth=${token}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        dispatch({
            type: DELETE_PRODUCT,
            id: id
        });
    }
};

export const createProduct = (title, description, imageUrl, price) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const response = await fetch(`https://rn-complete-guide-f81a2.firebaseio.com/products.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                price,
                ownerId: userId
            })
        });

        const data = await response.json();

        dispatch({
            type: CREATE_PRODUCT,
            data: {
                id: data.name,
                title,
                description,
                imageUrl,
                price,
                ownerId: userId
            }
        });
    }
};

export const updatedProduct = (id, title, description, imageUrl) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;

        const response = await fetch(`https://rn-complete-guide-f81a2.firebaseio.com/products/${id}.json?auth=${token}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl
            })
        });

        dispatch({
            type: UPDATE_PRODUCT,
            id: id,
            data: {
                title,
                description,
                imageUrl
            }
        });
    };
};