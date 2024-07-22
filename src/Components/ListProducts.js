import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ToastNotification from './ToastNotification';

const ListProducts = ({ data, deleteItem, editItem }) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editedData, setEditedData] = useState(data);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleDelete = () => {
    deleteItem(data.key);
    setDeleteModalVisible(false);
    setToastMessage("Produto excluído com sucesso!");
    setToastVisible(true);
  };

  const handleEdit = () => {
    editItem(editedData);
    setEditModalVisible(false);
    setToastMessage("Produto editado com sucesso!");
    setToastVisible(true);
  };

  const handleChange = (name, value) => {
    setEditedData({ ...editedData, [name]: value });
  };

  return (
    <View style={styles.productContainer}>
      <Image source={{ uri: data.image }} style={styles.productImage} />
      <Text style={styles.productTitle}>{data.name}</Text>
      <Text style={styles.productBrand}>{data.brand}</Text>
      <Text style={styles.productIngredients}>{data.ingredients}</Text>
      <View style={styles.buttonContainer}>

        <TouchableOpacity
          onPress={() => setDeleteModalVisible(true)}
          style={[styles.button, styles.deleteButton]}
        >
          <Icon name="trash" color="#FFFFFF" size={20} />
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setEditModalVisible(true)}
          style={[styles.button, styles.editButton]}
        >
          <Icon name="pencil" color="#FFFFFF" size={20} />
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={editModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={editedData.name}
              onChangeText={(text) => handleChange("name", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Marca"
              value={editedData.brand}
              onChangeText={(text) => handleChange("brand", text)}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              multiline
              numberOfLines={4}
              placeholder="Ingredientes"
              value={editedData.ingredients}
              onChangeText={(text) => handleChange("ingredients", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Código de Barras"
              value={editedData.codebar}
              onChangeText={(text) => handleChange("codebar", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Tipo"
              value={editedData.type.toString()}
              keyboardType="numeric"
              onChangeText={(text) => handleChange("type", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Link da Imagem"
              value={editedData.image}
              onChangeText={(text) => handleChange("image", text)}
            />

            <View style={styles.editActions}>
              <TouchableOpacity
                onPress={() => setEditModalVisible(false)}
                style={[styles.button, styles.cancelButton]}
              >
                <Icon name="close" color="#FFFFFF" size={20} />
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleEdit}
                style={[styles.button, styles.saveButton]}
              >
                <Icon name="checkmark" color="#FFFFFF" size={20} />
                <Text style={styles.buttonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={deleteModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirmação</Text>
            <Text>Tem certeza que deseja excluir este produto?</Text>
            <View style={styles.deleteActions}>
              <TouchableOpacity
                onPress={() => setDeleteModalVisible(false)}
                style={[styles.button, styles.cancelButton]}
              >
                <Icon name="close" color="#FFFFFF" size={20} />
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleDelete}
                style={[styles.button, styles.deleteButton]}
              >
                <Icon name="trash" color="#FFFFFF" size={20} />
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Toast para exibir mensagem de sucesso ou erro */}
      <ToastNotification
        visible={toastVisible}
        message={toastMessage}
        onDismiss={() => setToastVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#cccccc',
    backgroundColor: '#ffffff',
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  productBrand: {
    fontSize: 14,
    color: '#888888',
  },
  productIngredients: {
    fontSize: 14,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  editButton: {
    backgroundColor: '#008000',
  },
  deleteButton: {
    backgroundColor: '#ff0000',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  editActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#d3d3d3',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#008000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
  },
  deleteActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default ListProducts;
