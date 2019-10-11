import React, {useEffect} from 'react';
import {FlatList, Platform, Text} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from "../../components/shop/OrderItem";
import * as ordersActions from '../../store/actions/orders';

const OrdersScreen = props => {
    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(ordersActions.fetchOrders());
    }, [dispatch]);

    return <FlatList data={orders} keyExtractor={(item) => item.id}
                     renderItem={data => <OrderItem amount={data.item.totalAmount} date={data.item.readableDate} items={data.item.items}/>}/>
};


OrdersScreen.navigationOptions = data => {
    return {
        headerTitle: 'Orders',
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Menu'
                  iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                  onPress={() => {
                      data.navigation.toggleDrawer();
                  }}
            />
        </HeaderButtons>
    }
};

export default OrdersScreen;