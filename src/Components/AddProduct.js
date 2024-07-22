import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { firestore } from "./services/connectionFirebase";
import { ProductContext } from "./ProductContext";
import ToastNotification from "./ToastNotification";

export default function AddProduct() {
  const initialProductState = {
    name: "",
    brand: "",
    ingredients: "",
    codebar: "",
    type: "",
    saved: false,
    image: "", // Novo campo para o link da imagem
  };

  const [product, setProduct] = useState(initialProductState);
  const [errors, setErrors] = useState({});
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { addProduct } = useContext(ProductContext);

  const handleInputChange = (name, value) => {
    setProduct({ ...product, [name]: value });
    // Limpar o erro associado ao campo quando o usuário começa a digitar novamente
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSaveProduct = async () => {
    const formValid = validateInputs();
    if (!formValid) {
      return;
    }

    try {
      // Salvar o produto no Firestore
      const productToSave = {
        ...product,
        type: product.type ? product.type : undefined, // Manter o tipo como string
      };

      const docRef = await firestore.collection("products").add(productToSave);
      const savedProduct = { ...productToSave, id: docRef.id }; // Adicionar o ID do documento ao produto salvo
      addProduct(savedProduct); // Adicionar o produto ao contexto

      // Adicionar notificação ao Firestore
      const notification = {
        message: `Produto ${product.name} adicionado com sucesso!`,
        timestamp: new Date(),
      };
      await firestore.collection("notifications").add(notification);

      setProduct(initialProductState); // Limpar campos do formulário
      setToastMessage("Produto salvo com sucesso!");
      setToastVisible(true);
    } catch (error) {
      console.error("Error adding document: ", error);
      // Lidar com o erro de forma apropriada, por exemplo, exibindo uma mensagem de erro na modal
      setToastMessage("Erro ao salvar o produto. Por favor, tente novamente mais tarde.");
      setToastVisible(true);
    }
  };

  const validateInputs = () => {
    const errors = {};
    let formValid = true;

    if (!product.name) {
      errors.name = "Campo obrigatório";
      formValid = false;
    }
    if (!product.brand) {
      errors.brand = "Campo obrigatório";
      formValid = false;
    }
    if (!product.ingredients) {
      errors.ingredients = "Campo obrigatório";
      formValid = false;
    }
    if (!product.codebar) {
      errors.codebar = "Campo obrigatório";
      formValid = false;
    }
    if (!product.type) {
      errors.type = "Campo obrigatório";
      formValid = false;
    }

    setErrors(errors);
    return formValid;
  };

  const closeModal = () => {
    setToastVisible(false);
    // Limpar mensagem da toast ao fechar
    setToastMessage("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, styles.titleInput]}
        placeholder="Nome"
        value={product.name}
        onChangeText={(text) => handleInputChange("name", text)}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Marca"
        value={product.brand}
        onChangeText={(text) => handleInputChange("brand", text)}
      />
      {errors.brand && <Text style={styles.errorText}>{errors.brand}</Text>}

      <TextInput
        style={[styles.input, styles.textArea]}
        multiline
        numberOfLines={4}
        placeholder="Ingredientes"
        value={product.ingredients}
        onChangeText={(text) => handleInputChange("ingredients", text)}
      />
      {errors.ingredients && <Text style={styles.errorText}>{errors.ingredients}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Código de Barras"
        value={product.codebar}
        onChangeText={(text) => handleInputChange("codebar", text)}
      />
      {errors.codebar && <Text style={styles.errorText}>{errors.codebar}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Tipo"
        value={product.type}
        onChangeText={(text) => handleInputChange("type", text)}
      />
      {errors.type && <Text style={styles.errorText}>{errors.type}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Link da Imagem"
        value={product.image}
        onChangeText={(text) => handleInputChange("image", text)}
      />

      <View style={styles.editActions}>
        <TouchableOpacity
          onPress={handleSaveProduct}
          style={[styles.button, styles.saveButton]}
        >
          <Icon name="checkmark" color="#FFFFFF" size={20} />
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>

      {/* Toast para exibir mensagem de sucesso ou erro */}
      <ToastNotification
        visible={toastVisible}
        message={toastMessage}
        onDismiss={closeModal}
      />
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
  input: {
    marginBottom: 10,
    padding: 10,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 5,
    width: "100%",
  },
  titleInput: {
    height: 50,
    textAlignVertical: "top",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  editActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },
  button: {
    backgroundColor: "#008000",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#008000",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 5,
  },
});
