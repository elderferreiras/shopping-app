import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import Colors from "../constants/Colors";
import {Platform, SafeAreaView, View, Button} from 'react-native';
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import Fonts from "../constants/Fonts";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import {createDrawerNavigator, DrawerNavigatorItems} from "react-navigation-drawer";
import { Ionicons } from '@expo/vector-icons';
import UserProductsScreen from "../components/user/UserProductsScreen";
import EditProductScreen from "../components/user/EditProductScreen";
import {AuthSession} from "expo";
import AuthScreen from "../screens/user/AuthScreen";
import StartupScreen from "../screens/StartupScreen";
import {useDispatch} from "react-redux";
import {logout} from "../store/actions/auth";

const options = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
        fontFamily: Fonts.bold
    },
    headerBackTitleStyle: {
        fontFamily: Fonts.bold
    },
    headerTintColor: Platform.OS === 'android' ? Colors.white : Colors.primary
};

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => {
            return <Ionicons name={Platform.OS === 'android'? 'md-cart' : 'ios-cart'} size={23} color={drawerConfig.tintColor}/>;
        }
    },
    defaultNavigationOptions: options
});

const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => {
            return <Ionicons name={Platform.OS === 'android'? 'md-list' : 'ios-list'} size={23} color={drawerConfig.tintColor}/>;
        }
    },
    defaultNavigationOptions: options
});

const AdminNavigator = createStackNavigator({
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => {
            return <Ionicons name={Platform.OS === 'android'? 'md-create' : 'ios-create'} size={23} color={drawerConfig.tintColor}/>;
        }
    },
    defaultNavigationOptions: options
});


const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    },
    contentComponent: props => {
        const dispatch = useDispatch();

        return <View style={{flex: 1}}>
            <SafeAreaView forceInset={{top: 'always', horizontal: 'never', paddingTop: 20}}>
                <DrawerNavigatorItems {...props}/>
                <Button title="Logout" color={Colors.primary} onPress={() => {
                    dispatch(logout());
                }}/>
            </SafeAreaView>
        </View>
    }
});

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
}, {
    defaultNavigationOptions: options
});

const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthNavigator,
    Shop: ShopNavigator
});

export default createAppContainer(MainNavigator);