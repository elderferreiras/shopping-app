import React, {useEffect, useCallback, useReducer} from 'react';
import {View, KeyboardAvoidingView, StyleSheet, ScrollView, Platform, Alert} from "react-native";
import Fonts from "../../constants/Fonts";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../UI/HeaderButton";
import {useSelector, useDispatch} from "react-redux";
import * as productsActions from '../../store/actions/products';
import Input from "../UI/Input";

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };

        const updateValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };

        let updatedFormIsValid = true;

        for (const key in updateValidities) {
            updatedFormIsValid = updatedFormIsValid && updateValidities[key];
        }

        return {
            formIsValid: updatedFormIsValid,
            inputValues: updatedValues,
            inputValidities: updateValidities,
        }
    } else {
        return state;
    }
};

const EditProductScreen = props => {
    const dispatch = useDispatch();

    const id = props.navigation.getParam('id');

    const editProduct = useSelector(state => state.products.userProducts.find(product => product.id === id));

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editProduct ? editProduct.title : '',
            imageUrl: editProduct ? editProduct.imageUrl : '',
            description: editProduct ? editProduct.description : '',
            price: ''
        },
        inputValidities: {
            title: !!editProduct,
            imageUrl: !!editProduct,
            description: !!editProduct,
            price: !!editProduct,
        },
        formIsValid: !!editProduct
    });

    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert('Wrong input!', 'Please check the errors in the form.', [{text: 'Okay'}]);
            return;
        }

        if (editProduct) {
            dispatch(productsActions.updatedProduct(id, formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl));
        } else {
            dispatch(productsActions.createProduct(formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl, +formState.inputValues.price));
        }

        props.navigation.goBack();
    }, [dispatch, id, formState]);

    useEffect(() => {
        props.navigation.setParams({submit: submitHandler})
    }, [submitHandler]);

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        });
    }, [dispatchFormState]);

    return (
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding" keyboardVerticalOffset={100}>
            <ScrollView>
                <View style={styles.form}>
                    <Input label="Title"
                           id="title"
                           error="Please enter a valid title!"
                           keyboardType='default'
                           autoCapitalize='sentences'
                           autoCorrect={true}
                           returnKeyType={"next"}
                           onInputChange={inputChangeHandler}
                           initialValue={editProduct ? editProduct.title : ''}
                           initiallyValid={!!editProduct}
                           required
                    />

                    <Input label="Image Url"
                           id="imageUrl"
                           error="Please enter a valid image url!"
                           keyboardType='default'
                           returnKeyType={"next"}
                           onInputChange={inputChangeHandler}
                           initialValue={editProduct ? editProduct.imageUrl : ''}
                           initiallyValid={!!editProduct}
                           required
                    />

                    {!editProduct && <Input label="Price"
                                            id="price"
                                            error="Please enter a valid price!"
                                            keyboardType='decimal-pad'
                                            required
                                            onInputChange={inputChangeHandler}
                                            min={0.1}
                                            returnKeyType={"next"}/>}
                    <Input label="Description"
                           id="description"
                           error="Please enter a valid description!"
                           keyboardType='default'
                           autoCapitalize='sentences'
                           autoCorrect={true}
                           multiline={true}
                           numberOfLines={3}
                           onInputChange={inputChangeHandler}
                           initialValue={editProduct ? editProduct.description : ''}
                           initiallyValid={!!editProduct}
                           required
                           minLength={5}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
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