export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const deleteProduct = id => {
    return {
        type: DELETE_PRODUCT,
        id: id
    }
};

export const createProduct = (title, description, imageUrl, price) => {
    return {
        type: CREATE_PRODUCT,
        data: {
            title,
            description,
            imageUrl,
            price
        }
    }
};
export const updatedProduct = (id, title, description, imageUrl) => {
    return {
        type: UPDATE_PRODUCT,
        id: id,
        data: {
            title,
            description,
            imageUrl
        }
    }
};