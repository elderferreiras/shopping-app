import React from 'react';
import {View, Text, FlatList, Button, StyleSheet} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";
import CartItem from "../../components/shop/CartItem";
import * as actions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/orders';
import Card from "../../components/UI/Card";

const CartScreen = props => {
    const dispatch = useDispatch();
    const total = useSelector(state => state.cart.totalAmount);
    const items = useSelector(state => {
        const carItems = [];

        for(const key in state.cart.items) {
            if(state.cart.items.hasOwnProperty(key)) {
                carItems.push({
                    productId: key,
                    productTitle: state.cart.items[key].productTitle,
                    productPrice: state.cart.items[key].productPrice,
                    quantity: state.cart.items[key].quantity,
                    sum: state.cart.items[key].sum,
                });
            }
        }

        return carItems.sort((a,b) => a.productId > b.productId? 1: -1);
    });

    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>Total: <Text style={styles.amount}>${Math.round(total.toFixed(2)*100)/100}</Text></Text>
                <Button color={Colors.accent} title="Order Now"
                disabled={!items.length}
                        onPress={() => {
                            dispatch(ordersActions.addOrder(items, total));
                        }}
                />
            </Card>
            <FlatList data={items}
                      keyExtractor={item => item.productId}
                      renderItem={data => <CartItem
                      quantity={data.item.quantity}
                      title={data.item.productTitle}
                      amount={data.item.sum}
                      onRemove={() => {
                          dispatch(actions.removeFromCart(data.item.productId))
                      }}
                      />}/>
        </View>
    );
};

CartScreen.navigationOptions = {
    headerTitle: 'Cart'
};

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
    },
    summaryText: {
        fontFamily: Fonts.bold,
        fontSize: 18
    },
    amount: {
        color: Colors.primary
    }
});

export default CartScreen;