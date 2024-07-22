import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

function AllergiesScreen() {
  const [alergias, setAlergias] = useState([
    { nome: 'Ovo', ativado: false },
    { nome: 'Gluten', ativado: false },
    { nome: 'Proteína do Leite', ativado: false },
    { nome: 'Amendoim', ativado: false },
    { nome: 'Camarão', ativado: false },
    { nome: 'Pistache', ativado: false },
    { nome: 'Amêndoas', ativado: false },
    { nome: 'Soja', ativado: false },
    { nome: 'Trigo', ativado: false },
  ]);

  const toggleSwitch = (index) => {
    setAlergias((prevState) =>
      prevState.map((alergia, i) =>
        i === index ? { ...alergia, ativado: !alergia.ativado } : alergia
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edite suas alergias</Text>
      {alergias.map((alergia, index) => (
        <View key={index} style={styles.switchContainer}>
          <Text style={styles.alergiaText}>{alergia.nome}</Text>
          <Switch
            value={alergia.ativado}
            onValueChange={() => toggleSwitch(index)}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  alergiaText: {
    fontSize: 18,
  },
});

export default AllergiesScreen;
