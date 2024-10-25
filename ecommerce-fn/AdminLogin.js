import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Font Awesome icons

const AdminLogin = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (email === 'admin@gmail.com' && password === 'admin123') {
            Alert.alert('Login Successful!');
            navigation.navigate('AdminProductManagement'); 
        } else {
            Alert.alert('Invalid credentials, please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Icon name="envelope" size={20} color="#A4C639" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    placeholderTextColor="#A9A9A9"
                />
            </View>
            <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#A4C639" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="#A9A9A9"
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#1E3A5F',  // Navy blue background
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#A4C639',
        marginBottom: 20,
        paddingLeft: 10,
        width: '100%',
        maxWidth: 350,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        color: '#000',
    },
    button: {
        backgroundColor: '#A4C639',  // Lime green button
        padding: 15,
        borderRadius: 10,
        width: '100%',
        maxWidth: 350,
        alignItems: 'center',
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
    },
});

export default AdminLogin;
