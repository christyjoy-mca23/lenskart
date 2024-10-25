import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome
import config from './config'; 

export default function HomePage() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]); 
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`${config.BASE_URL}/data`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data); 
        setData(response.data); 
        setFilteredData(response.data); 
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch data');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, []);

  const handleSearchInputChange = (text) => {
    setSearchQuery(text);
    
    if (text === '') {
      setFilteredData(data); 
    } else {
      const filtered = data.filter(item =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered); 
    }
  };

  const addToCart = (item) => {
    setCart([...cart, item]); 
    Alert.alert('Success', `${item.name} added to cart!`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={handleSearchInputChange}
          returnKeyType="search"
          placeholderTextColor={'#A4C639'}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={filteredData}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { id: item._id })}>
                {item.image ? (
                  <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
                ) : (
                  <Text>No Image Available</Text>
                )}
              </TouchableOpacity>
              <View style={styles.itemDetails}>
                <Text style={styles.itemTitle}>{item.name}</Text>
                <Text>{item.description}</Text>
                <Text>Price: ${item.price}</Text>
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() => addToCart(item)}
                >
                  <Text style={styles.addToCartText}>Add to Cart</Text>
                  <FontAwesome name="cart-plus" size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item._id.toString()} // Use _id as key
        />
      )}

      <View style={styles.menuBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Cart', { cart })}>
          <Text style={styles.menuItem}>View Cart ({cart.length})</Text>
          <FontAwesome name="shopping-cart" size={20} color="#00796B" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.menuItem}>Profile</Text>
          <FontAwesome name="user" size={20} color="#00796B" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AboutUs')}>
          <Text style={styles.menuItem}>About Us</Text>
          <FontAwesome name="info-circle" size={20} color="#00796B" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001f3f', // Navy blue background
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#A4C639', // Lime green border
    borderRadius: 10,
    paddingHorizontal: 10,
    color: '#FFFFFF', // Text color white
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A4C639', // Lime green color
  },
  addToCartButton: {
    marginTop: 10,
    backgroundColor: '#00796B', // Darker shade of lime green
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 5,
  },
  menuBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#A4C639', // Lime green border
  },
  menuItem: {
    fontSize: 16,
    color: '#A4C639', // Lime green color
    flexDirection: 'row',
    alignItems: 'center',
  },
});
