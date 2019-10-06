import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity,Platform} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";

const CartItem = props => {
    return (
        <View style={styles.cartItem}>
            <Text style={styles.itemData}>
                <Text style={styles.quantity}>{props.quantity}</Text><Text style={styles.mainText}> {props.title}</Text>
            </Text>

            <View style={styles.itemData}>
                <Text style={styles.mainText}>${props.amount.toFixed(2)}</Text>
                {props.onRemove && <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                    <Ionicons name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                    size={24}
                    color="red"/>
                </TouchableOpacity>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        backgroundColor: Colors.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    quantity: {
        fontFamily: Fonts.normal,
        color: '#888'
    },
    mainText: {
        fontFamily: Fonts.bold,
        fontSize: 16
    },
    deleteButton: {
        marginLeft: 20
    }
});

export default CartItem;