import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';

export default function AboutUs() {
  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: 'https://my-lkstore.lenskart.com/store_locator_image/Store_Static_Image/LenskartStoreFrontImageCompressed.png' }} // Lenskart store image
        style={styles.bannerImage}
      />
      <Text style={styles.title}>Welcome to Lenskart</Text>
      <Text style={styles.description}>
        At Lenskart, we are passionate about providing a wide range of eyewear that blends style, comfort, and innovation. 
        Whether you're looking for trendy frames, prescription glasses, or contact lenses, we have something for everyone.
      </Text>
      <Text style={styles.subtitle}>Our Services</Text>
      <Text style={styles.description}>
        We pride ourselves on offering personalized customer service to help you find the perfect eyewear. 
        From expert advice to virtual try-ons, we ensure a seamless shopping experience with options for home delivery and after-sales support.
      </Text>
      <Text style={styles.subtitle}>Quality Assurance</Text>
      <Text style={styles.description}>
        Our eyewear is sourced from renowned brands and crafted with precision to ensure durability and comfort. 
        We stand by the quality of our products and offer warranties on all our eyewear.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  bannerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#003366', // Navy blue
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#003366', // Navy blue
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4CAF50', // Lime green
  },
});
