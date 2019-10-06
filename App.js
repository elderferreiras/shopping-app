import React, { useState } from 'react';
import {createStore, combineReducers} from "redux";
import {Provider} from 'react-redux';
import ShopNavigator from "./navigation/ShopNavigator";
import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer
});

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    });
};
const store = createStore(rootReducer);

export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false);

    if(!fontLoaded) {
        return <AppLoading startAsync={fetchFonts} onFinish={() => {
            setFontLoaded(true);
        }}/>
    }
    return (
        <Provider store={store}>
            <ShopNavigator/>
        </Provider>
    );
}
