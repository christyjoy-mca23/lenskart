import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons
import config from './config';

const UpdateProductForm = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { productId } = route.params;

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [benefits, setBenefits] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${config.BASE_URL}/products/${productId}`);
                const product = await response.json();

                if (response.ok) {
                    setName(product.name);
                    setDescription(product.description);
                    setPrice(product.price.toString());
                    setIngredients(product.ingredients.join(', '));
                    setBenefits(product.benefits.join(', '));
                    setImage(product.image);
                } else {
                    throw new Error('Failed to fetch product');
                }
            } catch (error) {
                Alert.alert('Error', 'Could not fetch product details');
            }
        };
        fetchProduct();
    }, [productId]);

    const handleUpdateProduct = async () => {
        const updatedProduct = {
            name,
            description,
            price: parseFloat(price),
            ingredients: ingredients.split(',').map((ingredient) => ingredient.trim()),
            benefits: benefits.split(',').map((benefit) => benefit.trim()),
            image,
        };

        try {
            const response = await fetch(`${config.BASE_URL}/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });

            if (response.ok) {
                Alert.alert('Success', 'Product updated successfully!');
                navigation.navigate('ProductList'); 
            } else {
                throw new Error('Failed to update product');
            }
        } catch (error) {
            Alert.alert('Error', 'Could not update product');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                <FontAwesome name="pencil" size={20} color="limegreen" /> Product Name
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Product Name"
                value={name}
                onChangeText={setName}
            />
            <Text style={styles.label}>
                <FontAwesome name="info-circle" size={20} color="limegreen" /> Description
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />
            <Text style={styles.label}>
                <FontAwesome name="money" size={20} color="limegreen" /> Price
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Price"
                keyboardType="numeric"
                value={price}
                onChangeText={setPrice}
            />
            <Text style={styles.label}>
                <FontAwesome name="leaf" size={20} color="limegreen" /> Size
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Ingredients (comma-separated)"
                value={ingredients}
                onChangeText={setIngredients}
            />
            <Text style={styles.label}>
                <FontAwesome name="check-square" size={20} color="limegreen" /> Benefits
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Benefits (comma-separated)"
                value={benefits}
                onChangeText={setBenefits}
            />
            <Text style={styles.label}>
                <FontAwesome name="image" size={20} color="limegreen" /> Image URL
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Image URL"
                value={image}
                onChangeText={setImage}
            />
            <Button title="Update Product" onPress={handleUpdateProduct} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#F8F9FA', // Light background for contrast
    },
    input: {
        flex: 1,
        height: 40,
        paddingLeft: 8,
        marginBottom: 12,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
    },
    label: {
        marginBottom: 4,
        fontWeight: 'bold',
    },
   
});

export default UpdateProductForm; 
