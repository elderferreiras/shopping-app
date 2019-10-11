import React, {useCallback, useEffect, useState} from 'react';
import {Button, FlatList, Platform, View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from '../../store/actions/cart';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from "../../constants/Colors";
import * as productsActions from '../../store/actions/products';

const ProductsOverviewScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => {
        setIsRefreshing(true);
        await dispatch(productsActions.fetchProducts());
        setIsRefreshing(false);
    }, [dispatch, setIsLoading]);

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadProducts);

        return () => {
            willFocusSub.remove();
        };
    }, [loadProducts]);

    useEffect(() => {
        setIsLoading(true);
        loadProducts().then(res => {
            setIsLoading(false);
        });
    }, [loadProducts]);

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetail', {
            id: id,
            title: title
        })
    };

    if (isLoading) {
        return <View style={styles.centered}>
            <ActivityIndicator size='large' color={Colors.primary}/>
        </View>
    }

    if(!isLoading && products.length === 0) {
        return <View style={styles.centered}>
            <Text>No products found. Maybe start adding some.</Text>
        </View>
    }
    return (
        <FlatList data={products} keyExtractor={item => item.id}
                  onRefresh={isRefreshing}
                  refreshing={isLoading}
                  renderItem={data =>
                      <ProductItem
                          {...data.item}
                          onSelect={() => {
                              selectItemHandler(data.item.id, data.item.title);
                          }}>
                          <Button color={Colors.primary} title="View Details" onPress={() => {
                              selectItemHandler(data.item.id, data.item.title);
                          }}/>
                          <Button color={Colors.primary} title="Cart" onPress={() => {
                              dispatch(cartActions.addToCart(data.item));
                          }}/>
                      </ProductItem>
                  }
        />
    );
};

const styles = StyleSheet.create({
    centered: {flex: 1, justifyContent: 'center', alignItems: 'center'}
});

ProductsOverviewScreen.navigationOptions = data => {
    return {
        headerTitle: 'All Products',
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Cart'
                  iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                  onPress={() => {
                      data.navigation.toggleDrawer();
                  }}
            />
        </HeaderButtons>,
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Cart'
                  iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                  onPress={() => {
                      data.navigation.navigate('Cart');
                  }}
            />
        </HeaderButtons>
    }
};

export default ProductsOverviewScreen;