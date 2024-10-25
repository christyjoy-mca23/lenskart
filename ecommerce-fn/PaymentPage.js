import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import config from './config';
//import { useUser } from './UserContext'; // Import the custom hook

const PaymentPage = ({ route }) => {
  const {  totalAmount,userId } = route.params;
  //const { userId } = useUser(); // Access userId from context
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const states = [
    { label: 'Andhra Pradesh', value: 'Andhra Pradesh' },
    { label: 'Arunachal Pradesh', value: 'Arunachal Pradesh' },
    { label: 'Assam', value: 'Assam' },
    { label: 'Bihar', value: 'Bihar' },
    { label: 'Chhattisgarh', value: 'Chhattisgarh' },
    { label: 'Goa', value: 'Goa' },
    { label: 'Gujarat', value: 'Gujarat' },
    { label: 'Haryana', value: 'Haryana' },
    { label: 'Himachal Pradesh', value: 'Himachal Pradesh' },
    { label: 'Jharkhand', value: 'Jharkhand' },
    { label: 'Karnataka', value: 'Karnataka' },
    { label: 'Kerala', value: 'Kerala' },
    { label: 'Madhya Pradesh', value: 'Madhya Pradesh' },
    { label: 'Maharashtra', value: 'Maharashtra' },
    { label: 'Manipur', value: 'Manipur' },
    { label: 'Meghalaya', value: 'Meghalaya' },
    { label: 'Mizoram', value: 'Mizoram' },
    { label: 'Nagaland', value: 'Nagaland' },
    { label: 'Odisha', value: 'Odisha' },
    { label: 'Punjab', value: 'Punjab' },
    { label: 'Rajasthan', value: 'Rajasthan' },
    { label: 'Sikkim', value: 'Sikkim' },
    { label: 'Tamil Nadu', value: 'Tamil Nadu' },
    { label: 'Telangana', value: 'Telangana' },
    { label: 'Tripura', value: 'Tripura' },
    { label: 'Uttar Pradesh', value: 'Uttar Pradesh' },
    { label: 'Uttarakhand', value: 'Uttarakhand' },
    { label: 'West Bengal', value: 'West Bengal' },
    { label: 'Andaman and Nicobar Islands', value: 'Andaman and Nicobar Islands' },
    { label: 'Chandigarh', value: 'Chandigarh' },
    { label: 'Dadra and Nagar Haveli', value: 'Dadra and Nagar Haveli' },
    { label: 'Daman and Diu', value: 'Daman and Diu' },
    { label: 'Lakshadweep', value: 'Lakshadweep' },
    { label: 'Delhi', value: 'Delhi' },
    { label: 'Puducherry', value: 'Puducherry' },
    { label: 'Ladakh', value: 'Ladakh' },
    { label: 'Jammu and Kashmir', value: 'Jammu and Kashmir' },
  ];

  const handlePayment = async () => {
    // Ensure that totalAmount is a number
    const totalAmountNum = parseFloat(totalAmount); // Convert to float
    
    if (!name || !address || !city || !state || !zip || !phoneNumber || isNaN(totalAmountNum)) {
      Alert.alert('Error', 'Please fill in all the fields and ensure totalAmount is a valid number.');
      return;
    }
  
    if (!paymentMethod) {
      Alert.alert('Error', 'Please select a payment method.');
      return;
    }
  
    setLoading(true);
  
    const paymentData = {
      userid: userId, // Ensure userId is defined
      phoneNumber, 
      totalAmount: totalAmountNum, // Use the converted number here
      address: {
        name, 
        addressLine: address,
        city,
        state,
        zip,
      },
      paymentMethod,
    };
   
    console.log('Payment Data:', paymentData); // Log the payment data
try {
  const response = await axios.post(`${config.BASE_URL}/pay`, paymentData);
  console.log('Payment Response:', response.data); // Log the entire response
  setLoading(false);
  if (response.data.success) {
    Alert.alert('Success', 'Payment details saved successfully.');
  } else {
    Alert.alert('Error', response.data.message || 'Failed to save payment details.');
  }
} catch (error) {
  setLoading(false);
  console.error('Payment Error:', error.response ? error.response.data : error.message);
  Alert.alert('Error', 'Something went wrong. Please try again later.');
}
 
  };
  

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Payment Details</Text>

        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />
<Text style={styles.label}>Phone Number</Text>
<TextInput
  style={styles.input}
  placeholder="Enter your phone number"
  value={phoneNumber}
  onChangeText={setPhoneNumber}
  keyboardType="phone-pad"
/>

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your address"
          value={address}
          onChangeText={setAddress}
        />

        <Text style={styles.label}>State</Text>
        <RNPickerSelect
          onValueChange={(value) => setState(value)}
          items={states}
          style={pickerSelectStyles}
          placeholder={{ label: 'Select a state', value: null }}
        />

        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your city"
          value={city}
          onChangeText={setCity}
        />

        <Text style={styles.label}>Zip Code</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your zip code"
          value={zip}
          onChangeText={setZip}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Payment Method</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={[styles.radioButton, paymentMethod === 'cod' && styles.radioSelected]}
            onPress={() => setPaymentMethod('cod')}
          >
            <Image
              style={styles.radioIcon}
              source={
                paymentMethod === 'cod'
                  ? require('./assets/checked.png')
                  : require('./assets/unchecked.png')
              }
            />
            <Text style={styles.radioText}>Cash on Delivery</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.radioButton, paymentMethod === 'upi' && styles.radioSelected]}
            onPress={() => setPaymentMethod('upi')}
          >
            <Image
              style={styles.radioIcon}
              source={
                paymentMethod === 'upi'
                  ? require('./assets/checked.png')
                  : require('./assets/unchecked.png')
              }
            />
            <Text style={styles.radioText}>UPI Payment</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.paymentButton}
          onPress={handlePayment}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.paymentButtonText}>Proceed to Pay</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#001f3f', // Navy Blue
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
    color: '#001f3f', // Navy Blue
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  radioButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  radioSelected: {
    backgroundColor: '#e0e0e0',
  },
  radioIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  radioText: {
    fontSize: 16,
    color: '#001f3f', // Navy Blue
  },
  paymentButton: {
    backgroundColor: '#001f3f', // Navy Blue
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  paymentButtonText: {
    color: '#A4C639', // Lime Green
    fontSize: 18,
    fontWeight: 'bold',
  },
});

// pickerSelectStyles
const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  inputAndroid: {
    fontSize: 16,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginBottom: 15,
  },
};

export default PaymentPage;


