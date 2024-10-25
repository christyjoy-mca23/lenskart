import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import config from './config';
import { useUser } from './UserContext'; 
import { FontAwesome } from '@expo/vector-icons'; // Importing FontAwesome

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const { setUser } = useUser();  
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post(`${config.BASE_URL}/signin`, { email, password });
      const { token, userId } = response.data;
      console.log(token, userId);

      await AsyncStorage.setItem('token', token);
      setUser({ id: userId, name: response.data.name, email: response.data.email });
      Alert.alert('Success', 'Sign-in successful!');
      navigation.navigate('HomePage');
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.error || 'Something went wrong';
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <View style={styles.inputContainer}>
        <FontAwesome name="envelope" size={20} color="#A4C639" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#A9A9A9"
        />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={20} color="#A4C639" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#A9A9A9"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignIn} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Signing In...' : 'Sign In'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1E3A5F',  // Navy blue background
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#FFF',
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
    padding: 15,
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
  linkText: {
    color: '#FFF',
    marginTop: 20,
    fontSize: 16,
  },
});
