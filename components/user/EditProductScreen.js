import React, { useState, useEffect, useCallback } from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView, Platform, Alert} from "react-native";
import Fonts from "../../constants/Fonts";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../UI/HeaderButton";
import {useSelector, useDispatch} from "react-redux";
import * as productsActions from '../../store/actions/products';

const EditProductScreen = props => {
    const dispatch = useDispatch();

    const id = props.navigation.getParam('id');

    const editProduct = useSelector(state => state.products.userProducts.find(product => product.id === id));

    const [title, setTitle] = useState(editProduct? editProduct.title : '');
    const [imageUrl, setImageUrl] = useState(editProduct? editProduct.imageUrl : '');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(editProduct? editProduct.description : '');


    const submitHandler = useCallback(() => {
        if(editProduct) {
            dispatch(productsActions.updatedProduct(id, title, description, imageUrl))
        } else {
            dispatch(productsActions.createProduct(title, description, imageUrl, +price))
        }

        props.navigation.goBack();
    }, [dispatch, id, title, description, imageUrl, price]);

    useEffect(() => {
        props.navigation.setParams({submit: submitHandler})
    }, [submitHandler]);

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label} >Title</Text>
                    <TextInput style={styles.input} value={title} onChangeText={text => setTitle(text)}/>
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput style={styles.input}  value={imageUrl} onChangeText={text => setImageUrl(text)}/>
                </View>
                {!editProduct && <View style={styles.formControl}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput style={styles.input} value={price} onChangeText={text => setPrice(text)}/>
                </View>}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput style={styles.input} value={description} onChangeText={text => setDescription(text)}/>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: Fonts.bold,
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
});

EditProductScreen.navigationOptions = data => {
    const submitHandler = data.navigation.getParam('submit');

    return {
        headerTitle: data.navigation.getParam('id') ? 'Edit Product' : 'Add Product',
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Save'
                  iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                  onPress={submitHandler}
            />
        </HeaderButtons>
    };
};

export default EditProductScreen;