import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Font Awesome icons
import config from './config';

const AddProductForm = () => {
    const navigation = useNavigation();
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [benefits, setBenefits] = useState('');
    const [image, setImage] = useState('');

    const handleAddProduct = async () => {
        try {
            const newProduct = {
                name: productName,
                description,
                price,
                ingredients,
                benefits,
                image,
            };

            const response = await axios.post(`${config.BASE_URL}/products`, newProduct); 
            Alert.alert('Product Added!', `Product Name: ${response.data.name}`);
            navigation.navigate('AdminProductManagement');
        } catch (error) {
            Alert.alert('Error', 'There was an issue adding the product.');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <InputField
                placeholder="Product Name"
                value={productName}
                onChangeText={setProductName}
                icon="tag"
            />
            <InputField
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                icon="info"
            />
            <InputField
                placeholder="Price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                icon="money"
            />
            <InputField
                placeholder="Size"
                value={ingredients}
                onChangeText={setIngredients}
                icon="leaf"
            />
            <InputField
                placeholder="Benefits"
                value={benefits}
                onChangeText={setBenefits}
                icon="check"
            />
            <InputField
                placeholder="Image URL"
                value={image}
                onChangeText={setImage}
                icon="image"
            />
            <CustomButton title="Add Product" onPress={handleAddProduct} />
        </View>
    );
};

const InputField = ({ placeholder, value, onChangeText, icon, keyboardType }) => {
    return (
        <View style={styles.inputContainer}>
            <Icon name={icon} size={20} color="#1E3A5F" style={styles.icon} />
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
            />
        </View>
    );
};

const CustomButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#F8F9FA', // Light background for contrast
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    input: {
        flex: 1,
        height: 40,
        paddingLeft: 8,
    },
    icon: {
        marginRight: 10,
    },
    button: {
        backgroundColor: '#A4C639', // Lime green button
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 12,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AddProductForm;
