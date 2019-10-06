import React from 'react';
import {ScrollView, View, Text, Image, StyleSheet, Button} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import Colors from "../../constants/Colors";
import * as cartActions from '../../store/actions/cart';

const ProductDetailScreen = props => {
    const id = props.navigation.getParam('id');
    const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === id));
    const dispatch = useDispatch();

    return (
        <ScrollView>
            <Image style={styles.image} source={{uri: selectedProduct.imageUrl}}/>
            <View style={styles.actions}>
                <Button color={Colors.primary} title="Add to cart" onPress={() => {
                    dispatch(cartActions.addToCart(selectedProduct));
                }}/>
            </View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center'
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20
    },
    description: {
        fontSize: 12,
        textAlign: 'center',
        marginHorizontal: 20
    }
});

ProductDetailScreen.navigationOptions = data => {
    return {
        headerTitle: data.navigation.getParam('title')
    };
};

export default ProductDetailScreen;