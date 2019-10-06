import React from 'react';
import {Button, FlatList, Platform, View} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from '../../store/actions/cart';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from "../../constants/Colors";

const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetail', {
            id: id,
            title: title
        })
    };

    return (
        <FlatList data={products} keyExtractor={item => item.id}
                  renderItem={data =>
                      <ProductItem
                          {...data.item}
                           onSelect={() => {
                               selectItemHandler(data.item.id, data.item.title);
                           }} >
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