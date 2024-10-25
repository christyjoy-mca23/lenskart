import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Font Awesome icons
import { useNavigation } from '@react-navigation/native';

const AdminProductManagement = () => {
    const navigation = useNavigation();

    const handleAddProduct = () => {
        navigation.navigate('AddProductForm');
    };

    const handleUpdateProduct = () => {
        navigation.navigate('ProductList');
    };

    const handleDeleteProduct = () => {
        navigation.navigate('DeleteProductForm');
    };

    return (
        <View style={styles.container}>
            <CustomButton title="Add Product" onPress={handleAddProduct} icon="plus" />
            <CustomButton title="Update Product" onPress={handleUpdateProduct} icon="edit" />
            <CustomButton title="Delete Product" onPress={handleDeleteProduct} icon="trash" />
        </View>
    );
};

const CustomButton = ({ title, onPress, icon }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Icon name={icon} size={20} color="#FFF" style={styles.icon} />
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#1E3A5F', // Navy blue background
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#A4C639', // Lime green button
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        width: '100%',
        maxWidth: 350,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    icon: {
        marginRight: 10,
    },
});

export default AdminProductManagement;
