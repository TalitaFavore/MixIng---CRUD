import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import AddProduct from '../Components/AddProduct';

function AddProductScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          Agradecemos sua contribuição!
        </Text>
        
        <AddProduct />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    backgroundColor: "#fff", // Fundo branco
    padding: 20,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    elevation: 3, // Sombra para efeito visual
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    lineHeight: 24,
  },
});

export default AddProductScreen;
