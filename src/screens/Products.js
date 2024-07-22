import React, { useState, useEffect, useRef } from "react";
import {View, Text, StyleSheet, TouchableOpacity, Keyboard, FlatList, ActivityIndicator, TextInput, Button} from "react-native";
import {PaperProvider, Dialog, Portal } from 'react-native-paper';
import firebase from "../services/connectionFirebase";
import ListProducts from "./listProducts";

const Separator = () => {
  return <View style={styles.separator} />;
};

export default function Products() {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [codebar, setCodebar] = useState("");
  const [key, setKey] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const inputRef = useRef(null);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    async function search() {
      await firebase
        .database()
        .ref("products")
        .on("value", (snapshot) => {
          setProducts([]);
          snapshot.forEach((chilItem) => {
            let data = {
              //de acordo com a chave de cada item busca os valores
              //cadastrados na relação e atribui nos dados
              key: chilItem.key,
              name: chilItem.val().name,
              brand: chilItem.val().brand,
              type: chilItem.val().type,
              ingredients: chilItem.val().ingredients,
              codebar: chilItem.val().codebar,
            };
            setProducts((oldArray) => [...oldArray, data].reverse());
          });
          setLoading(false);
        });
    }
    search();
  }, []);

  //método para inserir ou alterar os dados na coleção bike

  async function insertUpdate() {
    // Verifica se algum dos campos está vazio
    if (!name || !brand || !type || !ingredients || !codebar) {
      alert("Por favor, preencha todos os campos antes de prosseguir.");
      return;
    }
  
    // Continua apenas se nenhum campo estiver vazio
    // Se a chave também estiver vazia, trata-se de uma inserção
    if (!key) {
      // Cadastrar dados - insert
      let prod = await firebase.database().ref("products");
      let keyprod = prod.push().key;
      prod.child(keyprod).set({
        name: name,
        brand: brand,
        type: type,
        ingredients: ingredients,
        codebar: codebar,
      });
  
      alert("Produto Inserido!");
      clearData();
    } else {
      // Editar dados
      firebase.database().ref("products").child(key).update({
        name: name,
        brand: brand,
        type: type,
        ingredients: ingredients,
        codebar: codebar,
      });
  
      Keyboard.dismiss();
      alert("Produto Alterado!");
      clearData();
      setKey("");
    }
  }

  //função para excluir um item 
  function handleDelete(key) {
    setSelectedProduct(key);
    setVisible(true);
  }

  function confirmDelete() {
    firebase.database().ref('products').child(selectedProduct).remove()
      .then(() => {
        //todos os itens que forem diferentes daquele que foi deletado
        //serão atribuidos no array
        const findProducts = products.filter(item => item.key !== selectedProduct)
        setProducts(findProducts)
        setVisible(false);
      })
  }

  //função para editar
  function handleEdit(data) {
    setKey(data.key),
      setName(data.name),
      setBrand(data.brand),
      setType(data.type),
      setIngredients(data.ingredients),
      setCodebar(data.codebar);
  }

  function clearData() {
    setName("");
    setBrand("");
    setType("");
    setIngredients("");
    setCodebar("");
  }

    return (
      <PaperProvider>
    <View style={styles.container}>
      <TextInput
        placeholder="Nome"

        maxLength={40}
        style={styles.input}
        onChangeText={(texto) => setName(texto)}
        value={name}
        ref={inputRef}
      />

      <Separator />

      <TextInput
        placeholder="Marca"

        style={styles.input}
        onChangeText={(texto) => setBrand(texto)}
        value={brand}
        ref={inputRef}
      />

      <Separator />

      <TextInput
        placeholder="Tipo"

        style={styles.input}
        onChangeText={(texto) => setType(texto)}
        value={type}
        ref={inputRef}
      />

      <Separator />

      <TextInput
        placeholder="Ingredientes"

        style={styles.input}
        onChangeText={(texto) => setIngredients(texto)}
        value={ingredients}
        ref={inputRef}
      />

      <Separator />

      <TextInput
        placeholder="Código de Barras"

        style={styles.input}
        onChangeText={(texto) => setCodebar(texto)}
        value={codebar}
        ref={inputRef}
      />

      <Separator />

      <TouchableOpacity
        onPress={insertUpdate}
        style={styles.button}
        activeOpacity={0.5}
      >
        <Text style={styles.buttonTextStyle}>Salvar</Text>
      </TouchableOpacity>

      <View>
        <Text style={styles.listar}>Listar Produtos</Text>
      </View>

      {loading ? (
        <ActivityIndicator color="#121212" size={45} />
      ) : (
        <FlatList
          keyExtractor={(item) => item.key}
          data={products}
          renderItem={({ item }) => (
            <ListProducts
              data={item}
              deleteItem={handleDelete}
              editItem={handleEdit}
            />
          )}
        />
      )}

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Confirmar Exclusão</Dialog.Title>
          <Dialog.Content>
          <Text style={{ color: 'white' }}>Deseja realmente excluir este produto?</Text>
          </Dialog.Content>
          <Dialog.Actions>
          <TouchableOpacity
                style={[styles.dialogButton, styles.dialogButtonNo]}
                onPress={() => setVisible(false)}
              >
                <Text style={styles.buttonTextStyle}>Não</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.dialogButton, styles.dialogButtonYes]}
                onPress={confirmDelete}
              >
                <Text style={styles.buttonTextStyle}>Sim</Text>
              </TouchableOpacity>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  </PaperProvider>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
  },

  input: {
    marginBottom: 30,
    backgroundColor: "#FFF",
    borderRadius: 6,
    height: 45,
    width: 320,
    padding: 10,
    borderWidth: 2,
    borderColor: "#6EC071",
    placeholderTextColor: "#A9A9A9",
    alignItems: "center",
  },

  separator: {
    marginVertical: 5,
  },

  button: {
    backgroundColor: "black",
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: 300,
    alignItems: "center",
  },

  buttonImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch",
  },

  buttonTextStyle: {
    color: "white",
    fontSize: 18,
    fontFamily: "Quicksand",
    alignContent: 'center'
  },

  buttonIconSeparatorStyle: {
    backgroundColor: "#fff",
    width: 1,
    height: 20,
  },

  listar: {
    fontSize: 20,
    textAlign: "center",
  },

  dialogButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: 100,
    alignItems: "center",
    marginHorizontal: 5,
  },

  dialogButtonYes: {
    backgroundColor: "red",
  },

  dialogButtonNo: {
    backgroundColor: "black",
  },
});
