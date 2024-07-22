import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { firestore } from '../Components/services/connectionFirebase';
import ListProducts from '../Components/ListProducts';
import AddProduct from '../Components/AddProduct';

const ListProductsScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await firestore.collection('products').get();
        const data = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          key: doc.id,
        }));
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchData();
  }, []);

  const deleteItem = async (key) => {
    try {
      await firestore.collection('products').doc(key).delete();
      setProducts(products.filter(item => item.key !== key));
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  const editItem = async (item) => {
    try {
      await firestore.collection('products').doc(item.key).update(item);
      setProducts(products.map(prod => (prod.key === item.key ? item : prod)));
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ListProducts data={item} deleteItem={deleteItem} editItem={editItem} />
        )}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default ListProductsScreen;
