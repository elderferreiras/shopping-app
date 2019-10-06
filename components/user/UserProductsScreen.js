import React from 'react';
import {Alert, Button, FlatList, Platform} from "react-native";
import ProductItem from "../shop/ProductItem";
import {useSelector} from 'react-redux';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../UI/HeaderButton";
import Colors from "../../constants/Colors";
import * as productsActions from "../../store/actions/products";
import { useDispatch } from "react-redux";

const UserProductsScreen = props => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.userProducts);

    const editProductHandler = (id) => {
      props.navigation.navigate('EditProduct', {
          id: id
      });
    };

    const deleteHandler = (id) => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
            {text: 'No', style: 'default'},
            {text: 'Yes', style:'destructive', onPress: () => {
                    dispatch(productsActions.deleteProduct(id))
                }}
        ])
    };

    return <FlatList data={products} keyExtractor={item => item.id} renderItem={data =>
        <ProductItem imageUrl={data.item.imageUrl}
                     title={data.item.title}
                     price={data.item.price}
                     onSelect={() => {
                         editProductHandler(data.item.id);
                     }}
        >
            <Button color={Colors.primary} title="Add" onPress={() => {
                editProductHandler(data.item.id);
            }}/>
            <Button color={Colors.primary} title="Delete" onPress={() => deleteHandler(data.item.id)}/>
        </ProductItem>}/>
};

UserProductsScreen.navigationOptions = data => {
    return {
        headerTitle: 'Your Products',
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Cart'
                  iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                  onPress={() => {
                      data.navigation.toggleDrawer();
                  }}
            />
        </HeaderButtons>,
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Add'
                  iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                  onPress={() => {
                      data.navigation.navigate('EditProduct');
                  }}
            />
        </HeaderButtons>

    }
};

export default UserProductsScreen;