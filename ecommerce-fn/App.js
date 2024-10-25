import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LogoPage from './Logo';
import SignIn from './signin';
import SignUp from './signup';
import HomePage from './home';
import PaymentPage from './PaymentPage'
import Profile from './profile';
import AdminLogin from './AdminLogin'; 
import AdminProductManagement from './AdminProductManagement';
import AddProductForm from './AddProductForm';
import DeleteProductForm from './DeleteProductForm';
import UpdateProductForm from './UpdateProductForm';
import CartPage from './CartPage';
import ProductList from './ProductList';
import { UserProvider } from './UserContext';
import EditProfile from './EditProfile';
import AboutUs from './AboutUs'
import ProductDetail from './ProductDetail';

const Stack = createStackNavigator();

export default function App() {
  return (
    // <CartProvider>
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LogoPage">
          <Stack.Screen 
            name="LogoPage" 
            component={LogoPage} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="SignIn" 
            component={SignIn} 
          />
          <Stack.Screen 
            name="SignUp" 
            component={SignUp} 
          />
          {/* <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} /> */}
          <Stack.Screen 
            name="HomePage" 
            component={HomePage} 
          />
          
          <Stack.Screen name="Cart" component={CartPage}  /> 
          <Stack.Screen name="Payment" component={PaymentPage}  />
         
          <Stack.Screen 
            name="Profile" 
            component={Profile} 
          />
          <Stack.Screen 
            name="EditProfile" 
            component={EditProfile} 
          />
           <Stack.Screen 
            name="ProductList" 
            component={ProductList} 
          />
         
          <Stack.Screen 
            name="AdminLogin" 
            component={AdminLogin} 
          />
          
          <Stack.Screen name="AdminProductManagement" component={AdminProductManagement} />
          <Stack.Screen name="AddProductForm" component={AddProductForm} />
          <Stack.Screen name="DeleteProductForm" component={DeleteProductForm} />
          <Stack.Screen name="UpdateProductForm" component={UpdateProductForm} />
          <Stack.Screen name="AboutUs" component={AboutUs} />
          <Stack.Screen name="ProductDetail" component={ProductDetail} />
        </Stack.Navigator> 
      </NavigationContainer>
      </UserProvider>
  );
}
