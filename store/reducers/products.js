import PRODUCTS from '../../data/dummy-data';
import Product from '../../models/Product';
import {CREATE_PRODUCT, DELETE_PRODUCT, SET_PRODUCTS, UPDATE_PRODUCT} from "../actions/products";

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(product => product.ownerId === 'u1')
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
      case SET_PRODUCTS:
          return {
              availableProducts: action.products,
              userProducts: action.products.filter(prod => prod.ownerId === 'u1')
          };
      case CREATE_PRODUCT:
          const newProduct = new Product(
              action.data.id,
              'u1',
              action.data.title,
              action.data.imageUrl,
              action.data.description,
              action.data.price
          );

          return {
              ...state,
              availableProducts: state.availableProducts.concat(newProduct),
              userProducts: state.userProducts.concat(newProduct)
          };
      case UPDATE_PRODUCT:
          const productIndex = state.userProducts.findIndex(product => product.id === action.id);

          const updatedProduct = new Product(
              action.id,
              state.userProducts[productIndex].ownerId,
              action.data.title,
              action.data.imageUrl,
              action.data.description,
              state.userProducts[productIndex].price
          );

          const updatedUserProducts = [...state.userProducts];
          updatedUserProducts[productIndex] = updatedProduct;

          const availableProductIndex = state.availableProducts.findIndex(p => p.id === action.id);
          const updatedAvailableProducts = [...state.availableProducts];
          updatedAvailableProducts[availableProductIndex] = updatedProduct;

          return {
              ...state,
              availableProducts: updatedAvailableProducts,
              userProducts: updatedUserProducts
          };
      case DELETE_PRODUCT:
          return {
              ...state,
              userProducts: state.userProducts.filter(product => product.id !== action.id),
              availableProducts: state.userProducts.filter(product => product.id !== action.id)
          };
      default:
          return state;
  }
};

export default reducer;