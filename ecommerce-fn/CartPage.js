import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image, // Import Image
} from 'react-native';
import { useUser } from './UserContext';

export default function CartPage({ route, navigation }) {
  const { cart } = route.params; 
  const { user } = useUser(); // Access the user object from the context
  
  // Function to calculate the total amount
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2); // Sum of item prices
  };

  const handleOrderNow = () => {
    if (cart.length === 0) {
      Alert.alert('Empty Cart', 'You have no items in your cart.');
      return;
    }
    
    if (!user || !user.id) {
      Alert.alert('Error', 'No user ID found.');
      return;
    }

    const totalAmount = calculateTotalAmount(); // Get the total amount

    console.log(cart, user.id, totalAmount); // Make sure both the cart, user ID, and total amount are passed
    navigation.navigate('Payment', { cart, userId: user.id, totalAmount }); // Pass totalAmount along with cart and userId
  };
  
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.name}</Text>
      <Text>Price: ${item.price.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Image
          source={require('./assets/shopping-cart.png')} // Adjust the path as necessary
          style={styles.icon}
        /> */}
        <Text style={styles.title}>Your Cart</Text>
      </View>
      {cart.length === 0 ? (
        <Text style={styles.emptyMessage}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={(item) => item._id.toString()} 
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total Amount: ${calculateTotalAmount()}</Text>
          </View>
        </>
      )}
      <TouchableOpacity style={styles.orderButton} onPress={handleOrderNow}>
        <Text style={styles.orderButtonText}>Order Now</Text>
      </TouchableOpacity> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row', // Align icon and title horizontally
    alignItems: 'center', // Center align icon and title
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#001F3F', // Navy blue
    marginLeft: 10, // Space between icon and text
  },
  icon: {
    width: 30, // Adjust the width as necessary
    height: 30, // Adjust the height as necessary
  },
  itemContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyMessage: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  totalContainer: {
    marginTop: 10,
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  orderButton: {
    backgroundColor: '#39FF14', // Lime green
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  orderButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
