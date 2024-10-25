import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import config from './config';
import { useUser } from './UserContext';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons

export default function EditProfile({ navigation }) {
  const { user, setUser } = useUser(); // Access user context
  const [name, setName] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setProfileImage(imageUri);
    } else {
      console.log('Image selection canceled');
    }
  };

  const handleUpdateProfile = async () => {
    // Validation
    if (!name || !email) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }
    console.log(user.id)

    setLoading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);

    if (profileImage) {
      formData.append('profileImage', {
        uri: profileImage,
        name: 'profile.jpg',
        type: 'image/jpeg',
      });
    }

    try {
      const response = await axios.put(`${config.BASE_URL}/updateProfile/${user.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('Success', 'Profile updated successfully!');

      // Update user context with new data
      setUser((prevUser) => ({
        ...prevUser,
        username: name, // Updated name
        email, // Updated email
        profileImage: profileImage || prevUser.profileImage, // Updated profile image
      }));

      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Image 
          source={profileImage ? { uri: profileImage } : { uri: user?.profileImage }} 
          style={styles.profileImage} 
        />
        <Text style={styles.changeImageText}>Change Profile Picture</Text>
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <FontAwesome name="user" size={20} color="#003366" style={styles.icon} />
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Name"
        />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name="envelope" size={20} color="#003366" style={styles.icon} />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleUpdateProfile} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Updating...' : 'Update Profile'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginBottom: 20,
  },
  changeImageText: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#007bff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderColor: '#003366',
    borderWidth: 1,
    borderRadius: 5,
  },
  icon: {
    padding: 10,
    backgroundColor: '#e0f7fa', // Light background for icon
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  input: {
    flex: 1,
    padding: 10,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    color: '#003366', // Change text color to navy blue
  },
  button: {
    backgroundColor: '#28a745', // Green background for button
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
