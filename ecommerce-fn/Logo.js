import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LogoPage() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleSignin = () => {
    navigation.navigate('SignIn'); 
  };

  const handleSignup = () => {
    navigation.navigate('SignUp');
  };

  const handleAdminLogin = () => {
    navigation.navigate('AdminLogin'); 
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.logoContainer, opacity: fadeAnim }}>
        <Image
          source={require('./assets/logo.jpeg')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
      <Text style={styles.title}>Welcome to Lenskart</Text>
      <Text style={styles.subtitle}>Your one-stop shop for eyewear</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSignin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.adminButton} onPress={handleAdminLogin}>
          <Text style={styles.buttonText}>Admin Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',  // Light grey background for a clean design
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 250,  // Larger logo size
    height: 250,
    borderWidth: 6,
    borderColor: '#A4C639',  // Lime green border for a modern look
    borderRadius: 125,
    padding: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1E3A5F',  // Navy blue for title to convey professionalism
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 18,
    color: '#1E3A5F',  // Navy blue for subtitle to maintain consistency
    textAlign: 'center',
    marginBottom: 25,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 300,
  },
  button: {
    backgroundColor: '#A4C639',  // Lime green for buttons to highlight action areas
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  adminButton: {
    backgroundColor: '#A4C639',  // Same lime green for consistency
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  }, 
});
