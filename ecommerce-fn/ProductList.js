import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Font Awesome icons
import config from './config';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${config.BASE_URL}/products`);
                const data = await response.json();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleUpdateProduct = (productId) => {
        navigation.navigate('UpdateProductForm', { productId });
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#A4C639" />; // Lime green loader
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.productContainer}>
                        <View style={styles.productInfo}>
                            <Icon name="product-hunt" size={24} color="#1E3A5F" style={styles.icon} />
                            <Text style={styles.productText}>{item.name}</Text>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={() => handleUpdateProduct(item._id)}>
                            <Text style={styles.buttonText}>Update</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F8F9FA', // Light background for contrast
    },
    productContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    productInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    productText: {
        fontSize: 18,
        marginLeft: 10,
        color: '#1E3A5F', // Navy blue text
    },
    button: {
        backgroundColor: '#A4C639', // Lime green button
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    icon: {
        marginRight: 8,
    },
});

export default ProductList;
